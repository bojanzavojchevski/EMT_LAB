# Лабораториска вежба 3 — Accommodation Rental API

## Subject

**Електронска и мобилна трговија**  
Faculty of Computer Science and Engineering — FINKI

## Project

Accommodation Rental application built as a Spring Boot backend API and React TypeScript frontend UI.

---

# 1. Project Structure

The project is organized as a full-stack application:

```text
accommodation-rental
├── accommodation-rental-backend
└── accommodation-rental-frontend
```

## Backend

```text
accommodation-rental-backend
```

Technology stack:

- Java 21
- Spring Boot 3.5.14
- Maven
- PostgreSQL
- Docker Compose
- Flyway migrations
- Spring Data JPA
- Spring Security
- JWT authentication
- Lombok
- Validation
- Swagger/OpenAPI

Base package:

```text
mk.ukim.finki.emt.accommodationrental
```

## Frontend

```text
accommodation-rental-frontend
```

Technology stack:

- React
- TypeScript
- Vite
- Axios
- React Router
- Material UI

---

# 2. Backend — JWT Authentication and Authorization

In Lab 3, the existing Spring Boot API was extended with JWT-based authentication and authorization.

## 2.1 Added User Model

A new `User` entity was added:

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/model/domain/User.java
```

The entity implements `UserDetails`, so it can be used directly by Spring Security.

The user has:

- `email`
- `password`
- `fullName`
- `role`

The `email` is used as the Spring Security username.

## 2.2 Added Role Enum

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/model/enumeration/Role.java
```

Supported roles:

```java
USER,
ADMIN
```

Newly registered users receive the `USER` role by default.

## 2.3 Added Flyway Migration for Users

```text
src/main/resources/db/migration/V6__create_users_table.sql
```

This migration creates the `users` table with:

- `id`
- `created_at`
- `updated_at`
- `email`
- `password`
- `full_name`
- `role`

## 2.4 Added User Repository

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/repository/UserRepository.java
```

The repository provides:

```java
Optional<User> findByEmail(String email);
boolean existsByEmail(String email);
```

These methods are used during registration, login, and JWT validation.

---

# 3. Authentication DTOs

The following authentication DTOs were added:

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/model/dto/auth/RegisterRequest.java
src/main/java/mk/ukim/finki/emt/accommodationrental/model/dto/auth/LoginRequest.java
src/main/java/mk/ukim/finki/emt/accommodationrental/model/dto/auth/AuthenticationResponse.java
```

## RegisterRequest

Contains:

- `email`
- `password`
- `fullName`

The role is not accepted from the frontend, because allowing users to register themselves as `ADMIN` would be a security problem.

## LoginRequest

Contains:

- `email`
- `password`

## AuthenticationResponse

Contains:

- `token`

Example response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

# 4. JWT Security Implementation

## 4.1 JwtService

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/config/security/JwtService.java
```

This service is responsible for:

- generating JWT tokens
- extracting the username/email from a token
- checking token expiration
- validating tokens

JWT configuration was added to:

```text
src/main/resources/application.properties
```

Properties:

```properties
app.jwt.secret=...
app.jwt.expiration-ms=86400000
```

The expiration value represents 24 hours.

## 4.2 CustomUserDetailsService

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/config/security/CustomUserDetailsService.java
```

This class connects Spring Security to the application's `UserRepository` and loads users from the database by email.

## 4.3 JwtAuthenticationFilter

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/config/security/JwtAuthenticationFilter.java
```

This filter runs on incoming requests and:

1. reads the `Authorization` header
2. extracts the JWT token
3. extracts the email from the token
4. loads the user from the database
5. validates the token
6. sets the authenticated user inside Spring Security's context

The token is expected in this format:

```http
Authorization: Bearer <token>
```

## 4.4 SecurityConfig

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/config/security/SecurityConfig.java
```

The security configuration:

- disables CSRF for stateless REST API usage
- enables CORS for the React frontend
- configures stateless sessions
- registers the JWT filter
- defines public and protected endpoints
- defines password encoding using BCrypt

Public endpoints:

```text
/api/auth/**
GET /api/accommodations/**
GET /api/hosts/**
GET /api/countries/**
GET /api/accommodation-details-view/**
GET /api/accommodation-category-stats/**
Swagger/OpenAPI endpoints
```

Protected endpoints:

- renting accommodation requires `USER` or `ADMIN`
- activity logs require `ADMIN`
- write operations for accommodations, hosts, and countries require `ADMIN`

---

# 5. Authentication Service and Controller

## 5.1 AuthenticationService

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/service/AuthenticationService.java
```

Defines:

```java
AuthenticationResponse register(RegisterRequest request);
AuthenticationResponse login(LoginRequest request);
```

## 5.2 AuthenticationServiceImpl

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/service/impl/AuthenticationServiceImpl.java
```

The implementation:

- checks whether an email already exists
- hashes the password using BCrypt
- saves the user
- authenticates login requests
- generates JWT tokens

## 5.3 AuthenticationController

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/web/controller/AuthenticationController.java
```

Endpoints:

```http
POST /api/auth/register
POST /api/auth/login
```

Both endpoints return a JWT token after successful authentication.

---

# 6. Swagger JWT Support

Swagger/OpenAPI was configured to support JWT authorization.

Configuration file:

```text
src/main/java/mk/ukim/finki/emt/accommodationrental/config/OpenApiConfig.java
```

This adds the **Authorize** button in Swagger UI.

The user can paste the JWT token once, and Swagger automatically sends:

```http
Authorization: Bearer <token>
```

with protected requests.

---

# 7. Frontend — React TypeScript UI

A new React TypeScript application was created using Vite.

Frontend folder:

```text
accommodation-rental-frontend
```

The frontend implements the required Lab 3 routes:

```text
/
/accommodations
/hosts
/countries
```

It also implements detail routes for READ operations:

```text
/accommodations/:id
/hosts/:id
/countries/:id
```

Additional authentication routes were also added:

```text
/login
/register
```

---

# 8. Frontend Structure

The frontend is organized like this:

```text
src
├── api
├── components
├── hooks
├── pages
├── types
├── App.tsx
├── main.tsx
└── index.css
```

## 8.1 API Layer

```text
src/api
```

Files:

```text
accommodationRepository.ts
authRepository.ts
axiosInstance.ts
countryRepository.ts
hostRepository.ts
tokenStorage.ts
```

The frontend follows the repository pattern.

Instead of calling Axios directly inside components, pages use hooks, hooks use repositories, and repositories use Axios.

Flow:

```text
Page → Hook → Repository → Axios → Backend API
```

## 8.2 Axios Instance

```text
src/api/axiosInstance.ts
```

The Axios instance defines the backend base URL:

```ts
baseURL: "http://localhost:8080/api"
```

It also automatically attaches the JWT token to requests if a token exists in localStorage:

```http
Authorization: Bearer <token>
```

## 8.3 Token Storage

```text
src/api/tokenStorage.ts
```

This file manages the JWT token in localStorage.

It provides methods to:

- save token
- get token
- remove token
- check if user is authenticated

---

# 9. Frontend Types

TypeScript interfaces were added in:

```text
src/types
```

Files:

```text
accommodation.ts
auth.ts
country.ts
host.ts
```

These define the expected shape of data returned by the backend API.

---

# 10. Frontend Hooks

Custom hooks were created to encapsulate data-loading logic.

```text
src/hooks/useAccommodations.ts
src/hooks/useAccommodation.ts
src/hooks/useHosts.ts
src/hooks/useHost.ts
src/hooks/useCountries.ts
src/hooks/useCountry.ts
```

Each hook handles:

- loading state
- error state
- fetched data

This keeps page components clean and focused on rendering.

---

# 11. Frontend Components

Reusable components were created for layout and entity display.

## Layout Components

```text
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/components/layout/Layout.tsx
```

The `Layout` component uses React Router's `Outlet` to render the current page inside the shared layout.

## Entity Components

Countries:

```text
src/components/country/CountryCard.tsx
src/components/country/CountriesList.tsx
```

Hosts:

```text
src/components/host/HostCard.tsx
src/components/host/HostsList.tsx
```

Accommodations:

```text
src/components/accommodation/AccommodationCard.tsx
src/components/accommodation/AccommodationsList.tsx
```

Material UI components are used for cards, buttons, typography, layout, chips, alerts, and forms.

---

# 12. Frontend Pages

Implemented pages:

```text
src/pages/HomePage.tsx
src/pages/AccommodationsPage.tsx
src/pages/AccommodationDetailsPage.tsx
src/pages/HostsPage.tsx
src/pages/HostDetailsPage.tsx
src/pages/CountriesPage.tsx
src/pages/CountryDetailsPage.tsx
src/pages/LoginPage.tsx
src/pages/RegisterPage.tsx
```

## Home Page

Route:

```text
/
```

Displays a welcome page.

## Accommodations Pages

Routes:

```text
/accommodations
/accommodations/:id
```

Display all accommodations and individual accommodation details.

## Hosts Pages

Routes:

```text
/hosts
/hosts/:id
```

Display all hosts and individual host details.

## Countries Pages

Routes:

```text
/countries
/countries/:id
```

Display all countries and individual country details.

## Login Page

Route:

```text
/login
```

Allows an existing user to log in.

After successful login:

- token is saved in localStorage
- user is redirected to home page
- header shows Logout button

## Register Page

Route:

```text
/register
```

Allows a new user to register.

After successful registration:

- token is saved in localStorage
- user is redirected to home page
- header shows Logout button

---

# 13. React Router Configuration

Routes are configured in:

```text
src/App.tsx
```

Implemented routes:

```text
/
/login
/register
/accommodations
/accommodations/:id
/hosts
/hosts/:id
/countries
/countries/:id
```

The routes are nested inside the shared `Layout` component.

---

# 14. Authentication Flow

## Register Flow

1. User opens `/register`
2. User enters full name, email, and password
3. Frontend calls:

```http
POST /api/auth/register
```

4. Backend creates the user and returns a JWT token
5. Frontend stores the token in localStorage
6. User is redirected to home page

## Login Flow

1. User opens `/login`
2. User enters email and password
3. Frontend calls:

```http
POST /api/auth/login
```

4. Backend authenticates the user and returns a JWT token
5. Frontend stores the token in localStorage
6. User is redirected to home page

## Authenticated Request Flow

1. Token is stored in localStorage
2. Axios interceptor reads the token
3. Axios sends:

```http
Authorization: Bearer <token>
```

4. Backend JWT filter validates the token
5. Spring Security authenticates the request

## Logout Flow

1. User clicks Logout
2. Frontend removes the token from localStorage
3. User is redirected to `/login`

---

# 15. Testing and Verification

## Backend Build

Backend was verified with:

```powershell
.\mvnw clean test
```

Expected result:

```text
BUILD SUCCESS
```

## Frontend Build

Frontend was verified with:

```powershell
npm run build
```

Expected result:

```text
built in ...
```

The Vite warning about large chunks is acceptable for this lab because Material UI increases bundle size.

## Runtime Verification

Backend runs on:

```text
http://localhost:8080
```

Frontend runs on:

```text
http://localhost:5173
```

Verified frontend routes:

```text
http://localhost:5173/
http://localhost:5173/accommodations
http://localhost:5173/accommodations/1
http://localhost:5173/hosts
http://localhost:5173/hosts/1
http://localhost:5173/countries
http://localhost:5173/countries/1
http://localhost:5173/login
http://localhost:5173/register
```

Verified backend authentication:

```http
POST /api/auth/register
POST /api/auth/login
```

Both return JWT tokens.

Protected endpoints reject unauthorized users unless a valid token with the required role is provided.

---

# 16. How to Run the Project

## Start Backend

Open a terminal in:

```text
accommodation-rental-backend
```

Start PostgreSQL:

```powershell
docker compose up -d
```

Start Spring Boot:

```powershell
.\mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

Swagger URL:

```text
http://localhost:8080/swagger-ui/index.html
```

## Start Frontend

Open a second terminal in:

```text
accommodation-rental-frontend
```

Install dependencies if needed:

```powershell
npm install
```

Start React app:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 17. Explanation for Lab Defense

## Backend Explanation

In Lab 3, the backend was extended with JWT authentication and authorization. A custom `User` entity and `Role` enum were added. Users can register and log in through `/api/auth/register` and `/api/auth/login`. After successful authentication, the backend returns a JWT token. The client sends this token in the `Authorization` header. The JWT filter validates the token and sets the authenticated user in Spring Security's context.

## Frontend Explanation

The frontend was implemented using React, TypeScript, Vite, Axios, React Router, and Material UI. It supports the required routes for accommodations, hosts, and countries, including list and detail pages. API communication is done through Axios and organized using the repository pattern. Data loading is encapsulated in custom hooks.

## Architecture Explanation

The frontend uses this architecture:

```text
Page → Hook → Repository → Axios → Backend API
```

This separates UI rendering, data loading, API communication, and HTTP configuration.

## Security Explanation

The frontend stores the JWT token in localStorage after login or registration. Axios automatically attaches the token to every request using an interceptor. The backend validates the token through the JWT filter. Public read endpoints are accessible without authentication, while protected endpoints require a valid token and the correct role.

---

# 18. Notes

The frontend login/register pages are an additional improvement beyond the minimum Lab 3 frontend requirements.

The minimum Lab 3 requirements are satisfied by:

- JWT authentication and authorization on the backend
- React TypeScript UI
- routes for `/`, `/accommodations`, `/hosts`, `/countries`
- detail routes for READ operations
- Axios API communication
- repository pattern
- custom hooks
- shared Layout/Header/Footer
- Material UI components
