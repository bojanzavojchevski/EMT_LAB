# Accommodation Rental

Accommodation Rental is a full-stack laboratory project for the subject **Електронска и мобилна трговија** at FINKI.

The application allows users to browse accommodations, hosts, and countries.  
Administrators can manage all entities through CRUD operations.

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
- Swagger/OpenAPI

Backend location:

```text
accommodation-rental-backend
```

Run backend tests:

```powershell
cd accommodation-rental-backend
.\mvnw clean test
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

Build frontend:

```powershell
cd accommodation-rental-frontend
npm run build
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

## Implemented Features

- JWT register/login
- Protected frontend routes
- Role-based UI visibility
- CRUD UI for accommodations
- CRUD UI for hosts
- CRUD UI for countries
- Dialog-based create/edit forms
- Axios repository pattern
- Custom React hooks
- Backend role-based access control
- PostgreSQL persistence
- Flyway migrations

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

This is a laboratory project. The local database credentials and JWT secret are intended for development only and should not be reused in production.
