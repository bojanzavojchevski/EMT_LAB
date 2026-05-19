# Accommodation Rental

Accommodation Rental is a full-stack laboratory project for the subject **Електронска и мобилна трговија** at FINKI.

The application allows users to browse accommodations, hosts, and countries.  
Authenticated users can read data, while administrators can manage all entities through CRUD operations.

## Project Structure

```text
accommodation-rental
├─ accommodation-rental-backend
├─ accommodation-rental-frontend
└─ docs
```

## Backend

The backend is built with:

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

## Frontend

The frontend is built with:

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

Expected URLs:

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

## Implemented Features

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

The authentication response contains:

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

- [ ] Register a new user
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
