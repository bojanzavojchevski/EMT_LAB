# Laboratory Exercise 4 (2026) - Group B

Subject: **Електронска и мобилна трговија**  
Application: **Accommodation Rental**

## Goal

Lab 4 upgrades the React UI application from the previous lab so that it supports full CRUD operations for:

- Accommodations
- Hosts
- Countries

The UI communicates with the Spring Boot API using Axios, follows the repository pattern, uses custom hooks for data logic, and supports JWT authentication and role-based authorization.

---

## Project Structure

```text
accommodation-rental
├─ accommodation-rental-backend
└─ accommodation-rental-frontend
```

Backend:

```text
accommodation-rental-backend
```

Frontend:

```text
accommodation-rental-frontend
```

---

## Backend Stack

- Java 21
- Spring Boot
- Maven
- PostgreSQL
- Docker Compose
- Flyway
- Spring Data JPA
- Spring Security
- JWT authentication
- Validation
- Lombok
- Swagger/OpenAPI

---

## Frontend Stack

- Vite
- React
- TypeScript
- Axios
- react-router-dom
- Material UI

---

## Backend Changes for Lab 4

### 1. Country CRUD API

Country previously supported only read operations.

Added DTOs:

```text
model/dto/country/CreateCountryDto.java
model/dto/country/UpdateCountryDto.java
```

Added service methods:

```java
Country create(CreateCountryDto dto);
Country update(Long id, UpdateCountryDto dto);
void delete(Long id);
```

Added controller endpoints:

```http
POST   /api/countries
PUT    /api/countries/{id}
DELETE /api/countries/{id}
```

Existing endpoints:

```http
GET /api/countries
GET /api/countries/{id}
```

---

### 2. Host CRUD API

Host previously supported only read operations.

Added DTOs:

```text
model/dto/host/CreateHostDto.java
model/dto/host/UpdateHostDto.java
```

Host create/update request body uses `countryId`.

Added service methods:

```java
Host create(CreateHostDto dto);
Host update(Long id, UpdateHostDto dto);
void delete(Long id);
```

Added controller endpoints:

```http
POST   /api/hosts
PUT    /api/hosts/{id}
DELETE /api/hosts/{id}
```

Existing endpoints:

```http
GET /api/hosts
GET /api/hosts/{id}
```

---

### 3. Accommodation CRUD API

Accommodation already had CRUD support.

Existing endpoints:

```http
GET    /api/accommodations
GET    /api/accommodations/{id}
POST   /api/accommodations
PUT    /api/accommodations/{id}
DELETE /api/accommodations/{id}
PATCH  /api/accommodations/{id}/rent
```

Accommodation create/update request body:

```json
{
  "name": "Example accommodation",
  "category": "APARTMENT",
  "hostId": 1,
  "numRooms": 5,
  "condition": "GOOD"
}
```

Supported categories:

```text
ROOM, HOUSE, FLAT, APARTMENT, HOTEL, MOTEL
```

Supported conditions:

```text
GOOD, BAD
```

---

### 4. Authentication Response Updated

The authentication response was extended from:

```java
public record AuthenticationResponse(
        String token
) {
}
```

to:

```java
public record AuthenticationResponse(
        String token,
        String role
) {
}
```

This allows the frontend to know whether the logged-in user is a normal user or an administrator.

Example login response:

```json
{
  "token": "jwt-token-here",
  "role": "ADMIN"
}
```

---

### 5. Backend Security Updated

The backend security rules were updated so that read operations are no longer public.

Read operations require authentication:

```java
.hasAnyRole("USER", "ADMIN")
```

Write operations require administrator role:

```java
.hasRole("ADMIN")
```

Rules:

| Operation | Required Role |
|---|---|
| READ | USER or ADMIN |
| CREATE | ADMIN |
| UPDATE | ADMIN |
| DELETE | ADMIN |
| RENT | USER or ADMIN |

Important note: the lab statement uses the role name `ADMINISTRATOR`, but this project uses the enum value `ADMIN`. In this implementation, `ADMIN` is the administrator role.

---

## Frontend Changes for Lab 4

### 1. Repository Pattern

The repositories were extended with create, update, and delete methods.

Repositories:

```text
src/api/accommodationRepository.ts
src/api/hostRepository.ts
src/api/countryRepository.ts
```

Each repository now supports:

```ts
findAll()
findById(id)
create(request)
update(id, request)
deleteById(id)
```

---

### 2. Request Types

Added request types for create/update operations.

Files:

```text
src/types/accommodation.ts
src/types/host.ts
src/types/country.ts
```

Examples:

```ts
export interface CreateCountryRequest {
    name: string;
    continent: string;
}
```

```ts
export interface CreateHostRequest {
    name: string;
    surname: string;
    countryId: number;
}
```

```ts
export interface CreateAccommodationRequest {
    name: string;
    category: string;
    hostId: number;
    numRooms: number;
    condition: string;
}
```

---

### 3. Custom Hooks

The custom hooks were extended with CRUD functions and refetch logic.

Hooks:

```text
src/hooks/useAccommodations.ts
src/hooks/useHosts.ts
src/hooks/useCountries.ts
```

Each hook now supports:

```ts
refetch()
create...
update...
delete...
```

After every create, update, or delete operation, the hook refetches data so the UI refreshes automatically.

---

## UI Components Added

### Country CRUD UI

Added:

```text
src/components/country/CountryFormDialog.tsx
```

Updated:

```text
src/components/country/CountryCard.tsx
src/components/country/CountriesList.tsx
src/pages/CountriesPage.tsx
```

Functionality:

- Add country with dialog
- Edit country with dialog
- Delete country
- Refetch after CRUD
- Hide Add/Edit/Delete for non-admin users

---

### Host CRUD UI

Added:

```text
src/components/host/HostFormDialog.tsx
```

Updated:

```text
src/components/host/HostCard.tsx
src/components/host/HostsList.tsx
src/pages/HostsPage.tsx
```

Functionality:

- Add host with dialog
- Edit host with dialog
- Delete host
- Select country from dropdown
- Refetch after CRUD
- Hide Add/Edit/Delete for non-admin users

---

### Accommodation CRUD UI

Added:

```text
src/components/accommodation/AccommodationFormDialog.tsx
```

Updated:

```text
src/components/accommodation/AccommodationCard.tsx
src/components/accommodation/AccommodationsList.tsx
src/pages/AccommodationsPage.tsx
```

Functionality:

- Add accommodation with dialog
- Edit accommodation with dialog
- Delete accommodation
- Select category from dropdown
- Select host from dropdown
- Select condition from dropdown
- Refetch after CRUD
- Hide Add/Edit/Delete for non-admin users

---

## Authentication and Authorization in Frontend

### Token and Role Storage

Updated:

```text
src/api/tokenStorage.ts
```

The frontend now stores:

```text
accommodation_rental_token
accommodation_rental_role
```

Available helper methods:

```ts
saveToken(token)
getToken()
saveRole(role)
getRole()
isAdmin()
removeToken()
isAuthenticated()
```

---

### Login/Register Updated

Updated:

```text
src/pages/LoginPage.tsx
src/pages/RegisterPage.tsx
src/types/auth.ts
```

After login/register, the frontend stores both:

```ts
tokenStorage.saveToken(response.token);
tokenStorage.saveRole(response.role);
```

---

### Protected Routes

Added:

```text
src/components/auth/ProtectedRoute.tsx
```

The component checks:

- if the user has a token
- optionally, whether the user has one of the allowed roles

If the user is not authenticated, they are redirected to:

```text
/login
```

---

### Route Protection

Updated:

```text
src/App.tsx
```

Public routes:

```text
/
login
register
```

Protected routes:

```text
/accommodations
/accommodations/:id
/hosts
/hosts/:id
/countries
/countries/:id
```

---

### Header Updated

Updated:

```text
src/components/layout/Header.tsx
```

Unauthenticated users see:

- Home
- Login
- Register

Authenticated users see:

- Home
- Accommodations
- Hosts
- Countries
- Logout

---

## Authorization Behavior

### Anonymous User

| Page/Action | Expected |
|---|---|
| `/` | Allowed |
| `/accommodations` | Redirect to `/login` |
| `/hosts` | Redirect to `/login` |
| `/countries` | Redirect to `/login` |
| Add/Edit/Delete | Not available |

---

### USER Role

| Page/Action | Expected |
|---|---|
| Read accommodations | Allowed |
| Read hosts | Allowed |
| Read countries | Allowed |
| Details pages | Allowed |
| Add/Edit/Delete | Hidden and not allowed |

---

### ADMIN Role

| Page/Action | Expected |
|---|---|
| Read accommodations | Allowed |
| Read hosts | Allowed |
| Read countries | Allowed |
| Add accommodation | Allowed |
| Edit accommodation | Allowed |
| Delete accommodation | Allowed |
| Add host | Allowed |
| Edit host | Allowed |
| Delete host | Allowed |
| Add country | Allowed |
| Edit country | Allowed |
| Delete country | Allowed |

---

## Testing Commands

### Backend

```powershell
cd accommodation-rental-backend
.\mvnw clean test
```

Expected:

```text
BUILD SUCCESS
```

---

### Frontend

```powershell
cd accommodation-rental-frontend
npm run build
```

Expected:

```text
built successfully
```

---

### Run Full Application

From project root:

```powershell
npm run dev
```

Expected:

```text
Backend:  http://localhost:8080
Frontend: http://localhost:5173
```

If frontend starts on `5174`, stop the old Vite process because backend CORS is configured for `5173`.

---

## Manual Test Checklist

### Anonymous User

- [ ] Open `/`
- [ ] Try opening `/accommodations`
- [ ] Confirm redirect to `/login`
- [ ] Try opening `/hosts`
- [ ] Confirm redirect to `/login`
- [ ] Try opening `/countries`
- [ ] Confirm redirect to `/login`

### Normal USER

- [ ] Register new user
- [ ] Login as normal user
- [ ] Open accommodations page
- [ ] Open hosts page
- [ ] Open countries page
- [ ] Confirm Add/Edit/Delete buttons are hidden

### ADMIN

- [ ] Login as admin
- [ ] Confirm Add/Edit/Delete buttons are visible
- [ ] Add country
- [ ] Edit country
- [ ] Delete country
- [ ] Add host
- [ ] Edit host
- [ ] Delete host if not referenced by accommodation
- [ ] Add accommodation
- [ ] Edit accommodation
- [ ] Delete accommodation

---

## Notes

Deleting a country or host may fail if another entity references it. For example:

- A country cannot be deleted if a host uses it.
- A host cannot be deleted if an accommodation uses it.

This is normal database relationship behavior unless custom delete handling is added.

---

## Final Status

Lab 4 requirements are completed:

- CRUD UI for accommodations
- CRUD UI for hosts
- CRUD UI for countries
- Axios communication
- Repository pattern
- Custom hooks
- Refetch after CRUD operations
- Dialog-based create/edit forms
- JWT login/register
- Protected routes
- Role-based frontend visibility
- Role-based backend access control

