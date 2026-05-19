# Accommodation Rental

Accommodation Rental is a full-stack laboratory project for the subject **Електронска и мобилна трговија** at FINKI.

The application allows authenticated users to browse accommodations, hosts, and countries. Administrators can manage all entities through CRUD operations.

## Project Structure

```text
accommodation-rental
├─ accommodation-rental-backend
├─ accommodation-rental-frontend
└─ docs
```

## Tech Stack

### Backend

- Java
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

Backend location:

```text
accommodation-rental-backend
```

### Frontend

- React
- TypeScript
- Vite
- Axios
- Material UI
- React Router

Frontend location:

```text
accommodation-rental-frontend
```

## Prerequisites

Before running the project, make sure you have installed:

- Java 21 or newer
- Node.js and npm
- Docker Desktop
- Git

## Setup

Clone the repository:

```powershell
git clone <repository-url>
cd accommodation-rental
```

Install frontend dependencies:

```powershell
cd accommodation-rental-frontend
npm install
cd ..
```

Start the PostgreSQL database:

```powershell
cd accommodation-rental-backend
docker compose up -d
cd ..
```

Run backend tests:

```powershell
cd accommodation-rental-backend
.\mvnw clean test
cd ..
```

Build the frontend:

```powershell
cd accommodation-rental-frontend
npm run build
cd ..
```

## Running the Application

From the project root:

```powershell
npm run dev
```

Expected local URLs:

```text
Backend:  http://localhost:8080
Frontend: http://localhost:5173
```

If the frontend starts on `5174`, stop the old Vite process because the backend CORS configuration is set for `5173`.

## Authentication and Authorization

The application uses JWT authentication.

Roles:

- `USER`
- `ADMIN`

Access rules:

| Role | Permissions |
|---|---|
| Anonymous | Home page only |
| USER | Read accommodations, hosts, and countries |
| ADMIN | Full CRUD access |

Newly registered users are created with the `USER` role by default.

## Local Admin Setup

To test administrator functionality locally, promote a user to `ADMIN` in PostgreSQL:

```powershell
cd accommodation-rental-backend
docker compose exec db psql -U emt -d accommodation_rental -c "UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';"
```

After changing the role, log out and log in again so the frontend stores the updated role.

## Features

- JWT register/login
- JWT token and role storage in localStorage
- Protected frontend routes
- Role-based UI visibility
- CRUD UI for accommodations
- CRUD UI for hosts
- CRUD UI for countries
- Dialog-based create/edit forms
- Axios repository pattern
- Custom React hooks
- Refetch after create/update/delete operations
- Backend role-based access control
- PostgreSQL persistence
- Flyway migrations
- Swagger/OpenAPI documentation

## Main API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

Example authentication response:

```json
{
  "token": "jwt-token",
  "role": "ADMIN"
}
```

### Accommodations

```http
GET    /api/accommodations
GET    /api/accommodations/{id}
POST   /api/accommodations
PUT    /api/accommodations/{id}
DELETE /api/accommodations/{id}
PATCH  /api/accommodations/{id}/rent
```

### Hosts

```http
GET    /api/hosts
GET    /api/hosts/{id}
POST   /api/hosts
PUT    /api/hosts/{id}
DELETE /api/hosts/{id}
```

### Countries

```http
GET    /api/countries
GET    /api/countries/{id}
POST   /api/countries
PUT    /api/countries/{id}
DELETE /api/countries/{id}
```

## Frontend Routes

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

## Testing

Backend tests:

```powershell
cd accommodation-rental-backend
.\mvnw clean test
```

Frontend build:

```powershell
cd accommodation-rental-frontend
npm run build
```

Manual verification:

- Anonymous users can access only the home page.
- Normal users can view accommodations, hosts, and countries.
- Admin users can create, update, and delete accommodations, hosts, and countries.

## Documentation

Lab documentation is available in:

```text
docs/
```

Included lab notes:

- `docs/lab-1.md`
- `docs/lab-2.md`
- `docs/lab-3.md`
- `docs/lab-4.md`

## Notes

Deleting a country or host may fail if another entity references it. For example:

- A country cannot be deleted if a host uses it.
- A host cannot be deleted if an accommodation uses it.

This is normal database relationship behavior unless custom delete handling is added.

This is a laboratory project. The local database credentials and JWT secret are intended for development only and should not be reused in production.
