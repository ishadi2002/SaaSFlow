# SaaSFlow

SaaSFlow is a secure full-stack SaaS workspace management application developed using Spring Boot, React, and MySQL.

The system allows users to create accounts, securely log in, and manage their own organizations. It includes JWT-based authentication, BCrypt password encryption, role-based access control, protected REST APIs, and an admin-only dashboard.

This project was developed as part of my Software Engineering internship learning and practical development experience.

---

## Features

### Authentication & Security

- User registration
- User login
- BCrypt password hashing
- JWT-based authentication
- 24-hour JWT expiration
- Protected REST API endpoints
- Stateless authentication
- Role-based access control (RBAC)
- USER and ADMIN roles
- Admin-only protected endpoints
- CORS configuration
- Backend request validation

### Organization Management

Authenticated users can manage their own organizations.

- Create an organization
- View organizations
- Update an organization
- Delete an organization
- User-specific organization ownership
- Unauthorized users cannot update or delete another user's organizations

### Dashboard

The dashboard displays real data retrieved from the backend API.

- Total organization count
- Recent organization activity
- Authentication status
- Security status
- Backend API connection status
- Quick navigation actions

### Admin Dashboard

The application contains a protected admin area.

Only users with the `ADMIN` role can access the admin backend functionality.

Normal users who attempt to access protected admin functionality are denied by backend role-based access control.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- Lucide React
- CSS

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- BCrypt
- Jakarta Validation
- Lombok
- Maven

### Database

- MySQL

---

## System Architecture

SaaSFlow follows a client-server architecture.

```text
React Frontend
      |
      | HTTP / REST API
      | JWT Bearer Token
      v
Spring Boot Backend
      |
      | Spring Data JPA
      v
MySQL Database
```

The frontend communicates with the Spring Boot REST API using Axios.

After successful login, the backend generates a JWT. The frontend sends this token in the `Authorization` header when accessing protected endpoints.

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## Backend Architecture

The backend uses a layered structure:

```text
Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Database
```

Main backend packages:

```text
com.saasflow.jar
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
└── service
```

### Responsibilities

**Controller**  
Handles HTTP requests and responses.

**Service**  
Contains application and business logic.

**Repository**  
Handles database operations using Spring Data JPA.

**DTO**  
Transfers request and response data between the client and backend.

**Entity**  
Represents database entities.

**Security**  
Handles JWT authentication and Spring Security configuration.

**Exception**  
Provides centralized API error handling.

---

## Frontend Structure

```text
src
├── api
├── assets
├── components
├── context
├── layouts
├── pages
├── routes
└── styles
```

The frontend uses separate CSS files for major pages and layouts to keep the UI code organized and maintainable.

---

## REST API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |

### Organizations

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/organizations` | Get user's organizations | Authenticated |
| POST | `/api/organizations` | Create organization | Authenticated |
| PUT | `/api/organizations/{id}` | Update organization | Owner |
| DELETE | `/api/organizations/{id}` | Delete organization | Owner |

### Admin

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Access admin dashboard | ADMIN |

---

## User Roles

### USER

A normal registered account receives the `USER` role by default.

Users can:

- Login
- Access their dashboard
- Create organizations
- View their organizations
- Update their organizations
- Delete their organizations

### ADMIN

Administrators have access to protected admin functionality in addition to authenticated functionality.

Admin access is protected by Spring Security role-based authorization.

Public registration does not allow users to assign themselves the `ADMIN` role.

---

## Security

SaaSFlow implements several backend security mechanisms.

### Password Security

Passwords are hashed using BCrypt before being stored in the database.

Plain-text passwords are not stored.

### JWT Authentication

After successful login, the backend generates a signed JWT.

JWT expiration:

```text
24 hours
```

Protected requests require a valid JWT.

### Role-Based Access Control

Admin endpoints use Spring Security authorization.

Example:

```java
@PreAuthorize("hasRole('ADMIN')")
```

### Resource Ownership

Organization update and delete operations verify that the authenticated user owns the requested organization.

This prevents one user from modifying another user's organization.

---

## Error Handling

The backend provides centralized exception handling.

Examples include:

| Status | Meaning |
|---|---|
| 400 | Bad Request / Validation Error |
| 401 | Authentication Required |
| 403 | Forbidden |
| 404 | Resource Not Found |

Validation errors return structured error information to the client.

Example:

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Please provide a valid email",
    "password": "Password is required"
  }
}
```

---

## Environment Variables

The backend uses environment variables for sensitive configuration.

Required variables:

```text
DB_PASSWORD
JWT_SECRET
```

Example PowerShell configuration:

```powershell
$env:DB_PASSWORD="YOUR_DATABASE_PASSWORD"
$env:JWT_SECRET="YOUR_SECURE_JWT_SECRET"
```

Do not commit real passwords or JWT secrets to GitHub.

---

## Database Configuration

Create a MySQL database:

```sql
CREATE DATABASE saasflow_db;
```

The backend database configuration uses:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/saasflow_db
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
```

Hibernate is configured to update the schema automatically during development.

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## Running the Backend

Navigate to the backend project:

```powershell
cd saasflow-api
```

Set the required environment variables:

```powershell
$env:DB_PASSWORD="YOUR_DATABASE_PASSWORD"
$env:JWT_SECRET="YOUR_SECURE_JWT_SECRET"
```

Start Spring Boot:

```powershell
.\mvnw spring-boot:run
```

The backend runs on:

```text
http://localhost:8081
```

---

## Running the Frontend

Navigate to the frontend project:

```powershell
cd saasflow-frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the URL displayed by Vite in the terminal.

During local development, this may be:

```text
http://localhost:5173
http://localhost:5174
http://localhost:5175
```

---

## Main Learning Outcomes

This project demonstrates practical experience with:

- Full-stack application development
- REST API development
- React frontend development
- Spring Boot backend development
- MySQL database integration
- JWT authentication
- Spring Security
- BCrypt password hashing
- Role-based access control
- CRUD operations
- Resource ownership authorization
- Form validation
- Global exception handling
- Frontend-backend API integration
- Layered backend architecture
- Secure environment configuration

---

## Future Improvements

Possible future improvements include:

- Refresh tokens
- Email verification
- Forgot/reset password
- User profile management
- Organization member management
- Advanced admin analytics
- Audit logs
- Pagination and search
- Production deployment
- Automated testing
- Docker deployment

---

## Project Status

Core SaaSFlow functionality is implemented and tested.

- Authentication — Complete
- JWT Security — Complete
- Organization CRUD — Complete
- User-specific ownership — Complete
- Role-Based Access Control — Complete
- Admin protection — Complete
- Backend validation — Complete
- Error handling — Complete
- React frontend integration — Complete
- Dashboard integration — Complete

---

## Author

**Ishadi Lathinka**

Software System Technology Undergraduate  
University of Kelaniya