# Лабораториска вежба 2 — Accommodation Rental API

Subject: **Електронска и мобилна трговија**  
Application: **Accommodation Rental Spring Boot API**  
Base package: `mk.ukim.finki.emt.accommodationrental`

---

## Project stack

- Java 21
- Spring Boot 3.5.14
- Maven
- PostgreSQL with Docker Compose
- Flyway migrations
- Spring Data JPA
- Validation
- Lombok
- Swagger/OpenAPI

---

## Implemented Lab 2 requirements

| Requirement | Status |
|---|---|
| 1. Listing/searching accommodations with pagination, sorting and filtering | DONE |
| 2. Projections | DONE |
| 3. EntityGraph | DONE |
| 4. Database View | DONE |
| 5. Materialized View | DONE |
| 6. Scheduled refresh of materialized view | DONE |
| 7. Event handling when accommodation is rented | DONE |
| 8. Listener for fully occupied accommodations | DONE |
| 9. Activity logs | DONE |
| 10. Swagger/API demonstration | DONE |

---

# 1. Listing and searching accommodations with pagination

## Endpoint

```http
GET /api/accommodations/search
```

## Supported query parameters

| Parameter | Description |
|---|---|
| `page` | Page number |
| `size` | Page size |
| `sortBy` | Supported values: `name`, `createdAt` |
| `sortDirection` | Supported values: `asc`, `desc` |
| `category` | Filter by accommodation category |
| `hostId` | Filter by host |
| `countryId` | Filter by host country |
| `numRooms` | Filter by number of rooms |
| `available` | Filter by whether accommodation has available rooms |

## Example requests

```http
GET /api/accommodations/search?page=0&size=5&sortBy=name&sortDirection=asc
```

```http
GET /api/accommodations/search?category=APARTMENT&available=true&page=0&size=5&sortBy=name&sortDirection=asc
```

```http
GET /api/accommodations/search?hostId=1&countryId=1&page=0&size=10
```

## Implementation notes

The search endpoint uses one repository query with optional parameters.

Repository method:

```java
Page<Accommodation> findAllWithFilters(
        AccommodationCategory category,
        Long hostId,
        Long countryId,
        Integer numRooms,
        Boolean available,
        Pageable pageable
);
```

The controller returns:

```java
Page<DisplayAccommodationDto>
```

This means that the API does **not** expose the full `Accommodation` entity directly.

## Defense explanation

I implemented a single search endpoint with optional filters. The `Pageable` object handles pagination and sorting, while the repository query applies only the filters that are provided. The response is mapped to `DisplayAccommodationDto`, so the entity is not exposed directly.

---

# 2. Projections

## Projection interfaces

```text
AccommodationShortProjection
AccommodationExtendedProjection
```

## Short projection fields

```text
id
name
category
numRooms
```

## Extended projection fields

```text
id
name
category
numRooms
hostFullName
hostCountry
```

## Endpoints

```http
GET /api/accommodations/projections/short
```

```http
GET /api/accommodations/projections/extended
```

## Example requests

```http
GET /api/accommodations/projections/short?page=0&size=10
```

```http
GET /api/accommodations/projections/extended?page=0&size=10&sortBy=name&sortDirection=asc
```

## Implementation notes

The repository returns projection interfaces directly:

```java
Page<AccommodationShortProjection> findAllShortProjection(Pageable pageable);
Page<AccommodationExtendedProjection> findAllExtendedProjection(Pageable pageable);
```

The extended projection uses host and country data:

```text
hostFullName
hostCountry
```

## Defense explanation

A projection is a read-only shape that returns only selected fields from the repository. I used a short projection for basic accommodation information and an extended projection that also includes the host full name and host country.

---

# 3. EntityGraph

## Endpoint

```http
GET /api/accommodations/with-host-country
```

## Repository method

```java
@EntityGraph(attributePaths = {"host", "host.country"})
@Query("SELECT a FROM Accommodation a")
Page<Accommodation> findAllWithHostAndCountry(Pageable pageable);
```

## Returned DTO

```text
DisplayAccommodationWithHostCountryDto
```

The DTO contains:

```text
id
name
category
numRooms
condition
hostFullName
hostCountry
```

## Example request

```http
GET /api/accommodations/with-host-country?page=0&size=10
```

## Purpose

`EntityGraph` tells JPA/Hibernate to load related entities together with the main entity.

In this application, it loads:

```text
Accommodation -> Host -> Country
```

This helps avoid unnecessary additional SQL calls when reading related data.

## Defense explanation

I used `@EntityGraph(attributePaths = {"host", "host.country"})` on a read operation. This tells JPA to load the accommodation together with its host and the host's country. The endpoint returns a DTO containing `hostFullName` and `hostCountry`, which demonstrates that the related entities are used without exposing the full entity.

---

# 4. Database View

## Flyway migration

```text
src/main/resources/db/migration/V3__create_accommodation_details_view.sql
```

## Database view

```text
accommodation_details_view
```

## View columns

```text
id
accommodation_name
category
num_rooms
host_full_name
country_name
```

## SQL

```sql
CREATE VIEW accommodation_details_view AS
SELECT
    a.id AS id,
    a.name AS accommodation_name,
    a.category AS category,
    a.num_rooms AS num_rooms,
    CONCAT(h.name, ' ', h.surname) AS host_full_name,
    c.name AS country_name
FROM accommodations a
JOIN hosts h ON a.host_id = h.id
JOIN countries c ON h.country_id = c.id;
```

## Read-only model

```text
AccommodationDetailsView
```

The model is marked as read-only with:

```java
@Immutable
```

## Endpoint

```http
GET /api/accommodation-details-view
```

## Example request

```http
GET /api/accommodation-details-view?page=0&size=10
```

## Example response shape

```json
{
  "content": [
    {
      "id": 1,
      "accommodationName": "Ohrid Lake Room",
      "category": "ROOM",
      "numRooms": 2,
      "hostFullName": "Bojan Trajkovski",
      "countryName": "Macedonia"
    }
  ]
}
```

## Defense explanation

I created a database view through Flyway to simplify reading accommodation details joined with host and country data. The view is mapped to a read-only JPA model using `@Immutable`, and the data is exposed through a paginated endpoint.

---

# 5. Materialized View

## Flyway migration

```text
src/main/resources/db/migration/V4__create_accommodation_category_stats_materialized_view.sql
```

## Materialized view

```text
accommodation_category_stats_view
```

## Materialized view columns

```text
category
total_accommodations
total_rooms
average_rooms
```

## SQL

```sql
CREATE MATERIALIZED VIEW accommodation_category_stats_view AS
SELECT
    a.category AS category,
    COUNT(a.id) AS total_accommodations,
    COALESCE(SUM(a.num_rooms), 0) AS total_rooms,
    COALESCE(ROUND(AVG(a.num_rooms), 2), 0) AS average_rooms
FROM accommodations a
GROUP BY a.category;

CREATE UNIQUE INDEX idx_accommodation_category_stats_category
ON accommodation_category_stats_view (category);
```

## Read-only model

```text
AccommodationCategoryStatsView
```

The model is read-only:

```java
@Immutable
```

## Endpoint

```http
GET /api/accommodation-category-stats
```

## Example response shape

```json
[
  {
    "category": "MOTEL",
    "totalAccommodations": 1,
    "totalRooms": 1,
    "averageRooms": 1
  },
  {
    "category": "ROOM",
    "totalAccommodations": 1,
    "totalRooms": 2,
    "averageRooms": 2
  },
  {
    "category": "APARTMENT",
    "totalAccommodations": 1,
    "totalRooms": 4,
    "averageRooms": 4
  }
]
```

## Defense explanation

I created a materialized view through Flyway that stores aggregated accommodation statistics by category. It contains the category, total number of accommodations, total number of rooms, and average number of rooms. The view is mapped to a read-only model and exposed through a GET endpoint.

---

# 6. Scheduled refresh of the materialized view

## Reason

A materialized view does **not** update automatically when the underlying table changes.

For example, when an accommodation is rented, `numRooms` changes, but the materialized view keeps the old values until it is refreshed.

## Refresh SQL

```sql
REFRESH MATERIALIZED VIEW accommodation_category_stats_view;
```

## Service

```text
MaterializedViewRefreshService
MaterializedViewRefreshServiceImpl
```

## Scheduler

```text
AccommodationCategoryStatsRefreshScheduler
```

## Scheduling annotation

```java
@Scheduled(fixedRateString = "${app.materialized-view-refresh-rate-ms:60000}")
```

## Configuration property

```properties
app.materialized-view-refresh-rate-ms=60000
```

## Console log

```text
Materialized view accommodation_category_stats_view refreshed successfully.
```

## Defense explanation

Since materialized views do not automatically reflect changes, I added a scheduled task that periodically refreshes the materialized view. The interval is configurable through `application.properties`.

---

# 7. Event handling when renting accommodation

## Existing rent endpoint

```http
PATCH /api/accommodations/{id}/rent
```

## Flow

```text
PATCH /api/accommodations/{id}/rent
        ↓
AccommodationServiceImpl.rent(...)
        ↓
numRooms decreases by 1
        ↓
AccommodationRentedEvent is published
        ↓
AccommodationEventListener handles the event
        ↓
RENTED activity log is created
```

## Event

```text
AccommodationRentedEvent
```

Fields:

```text
accommodationId
accommodationName
remainingRooms
```

## Event publishing

The event is published after the accommodation is successfully rented and saved.

```java
this.applicationEventPublisher.publishEvent(
        new AccommodationRentedEvent(
                savedAccommodation.getId(),
                savedAccommodation.getName(),
                savedAccommodation.getNumRooms()
        )
);
```

## Listener

```text
AccommodationEventListener
```

The listener handles:

```java
@EventListener
public void onAccommodationRented(AccommodationRentedEvent event)
```

## Defense explanation

After a successful rent, the service publishes an `AccommodationRentedEvent`. A listener handles the event and creates a `RENTED` activity log record. This separates the core rent logic from side effects like logging.

---

# 8. Fully occupied accommodation listener behavior

## Condition

If an accommodation is rented and the remaining rooms become:

```text
numRooms = 0
```

then the listener creates an additional activity log with type:

```text
FULLY_OCCUPIED
```

## Listener logic

```java
if (event.remainingRooms() == 0) {
    this.activityLogService.create(
            event.accommodationName(),
            ActivityLogEventType.FULLY_OCCUPIED
    );
}
```

## Defense explanation

The listener checks whether the number of remaining rooms became zero after a rent event. If yes, it records a separate `FULLY_OCCUPIED` activity log. This makes the fully occupied state visible through the API.

---

# 9. Activity logs

## Flyway migration

```text
src/main/resources/db/migration/V5__create_activity_logs_table.sql
```

## Table

```text
activity_logs
```

## SQL

```sql
CREATE TABLE activity_logs (
    id BIGSERIAL PRIMARY KEY,
    accommodation_name VARCHAR(255) NOT NULL,
    event_time TIMESTAMP NOT NULL,
    event_type VARCHAR(50) NOT NULL
);
```

## Entity

```text
ActivityLog
```

## Enum

```text
ActivityLogEventType
```

Values:

```text
RENTED
FULLY_OCCUPIED
```

## Repository

```text
ActivityLogRepository
```

## Service

```text
ActivityLogService
ActivityLogServiceImpl
```

## Endpoint

```http
GET /api/activity-logs?page=0&size=10
```

## Example response after renting until fully occupied

```json
{
  "content": [
    {
      "id": 1,
      "accommodationName": "Ohrid Lake Room",
      "eventTime": "2026-05-18T23:13:10.055696",
      "eventType": "RENTED"
    },
    {
      "id": 2,
      "accommodationName": "Ohrid Lake Room",
      "eventTime": "2026-05-18T23:13:59.410509",
      "eventType": "RENTED"
    },
    {
      "id": 3,
      "accommodationName": "Ohrid Lake Room",
      "eventTime": "2026-05-18T23:13:59.412513",
      "eventType": "FULLY_OCCUPIED"
    }
  ]
}
```

## Defense explanation

The activity log stores records for important system events. For every successful rent, the listener creates a `RENTED` record. If the accommodation becomes fully occupied, it also creates a `FULLY_OCCUPIED` record. The logs are visible through a paginated endpoint.

---

# 10. Swagger/API testing checklist

Use Swagger UI to demonstrate the following endpoints.

---

## 10.1 Pagination/search endpoint

```http
GET /api/accommodations/search?page=0&size=5&sortBy=name&sortDirection=asc
```

Combined filter example:

```http
GET /api/accommodations/search?category=APARTMENT&available=true&page=0&size=5&sortBy=name&sortDirection=asc
```

Expected result:

```text
Paginated DTO response.
```

Explain:

```text
This endpoint supports pagination, sorting, filtering and returns DTOs instead of entities.
```

---

## 10.2 Projection endpoint

```http
GET /api/accommodations/projections/short
```

or:

```http
GET /api/accommodations/projections/extended
```

Expected result:

```text
Projection response with selected fields.
```

Explain:

```text
This endpoint returns data through projection interfaces instead of returning full entities.
```

---

## 10.3 EntityGraph endpoint

```http
GET /api/accommodations/with-host-country
```

Expected result:

```text
Response contains hostFullName and hostCountry.
```

Explain:

```text
The repository method uses @EntityGraph(attributePaths = {"host", "host.country"}) to load Host and Country together with Accommodation.
```

---

## 10.4 Database view endpoint

```http
GET /api/accommodation-details-view?page=0&size=10
```

Expected result:

```text
Data from accommodation_details_view.
```

Explain:

```text
This endpoint reads from a normal database view created through Flyway.
```

---

## 10.5 Materialized view endpoint

```http
GET /api/accommodation-category-stats
```

Expected result:

```text
Category statistics with total accommodations, total rooms, and average rooms.
```

Explain:

```text
This endpoint reads from a materialized view that stores aggregated data.
```

---

## 10.6 Scheduled refresh

Wait for the console log:

```text
Materialized view accommodation_category_stats_view refreshed successfully.
```

Explain:

```text
The scheduled task periodically refreshes the materialized view because materialized views are not updated automatically.
```

---

## 10.7 Rent event and listener effect

First check activity logs:

```http
GET /api/activity-logs?page=0&size=10
```

Rent an accommodation:

```http
PATCH /api/accommodations/1/rent
```

Check activity logs again:

```http
GET /api/activity-logs?page=0&size=10
```

Expected result:

```text
A RENTED activity log is created.
```

If the accommodation reaches `numRooms = 0`, expected additional result:

```text
FULLY_OCCUPIED activity log is created.
```

Explain:

```text
After a successful rent, the service publishes an event. The listener processes that event and saves activity logs. If remainingRooms becomes zero, the listener also saves a FULLY_OCCUPIED log.
```

---

# Final lab defense summary

This Lab 2 implementation extends the Accommodation Rental API with:

```text
pagination
sorting
filtering
DTO-based responses
projections
EntityGraph optimized reading
database view
materialized view
scheduled materialized view refresh
event handling
listener logic
activity logs
Swagger-testable endpoints
```

The most important flow is the rent event flow:

```text
Successful rent
    ↓
numRooms decreases
    ↓
AccommodationRentedEvent is published
    ↓
AccommodationEventListener handles the event
    ↓
RENTED activity log is saved
    ↓
if numRooms = 0, FULLY_OCCUPIED activity log is also saved
```

This satisfies the remaining event-handling, fully occupied listener, and activity log requirements.
