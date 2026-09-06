# SaaSFlow

SaaSFlow is a secure full-stack SaaS workspace management application developed using Spring Boot, React, and MySQL.

The system allows users to create accounts, securely log in, and manage their own organizations. It includes JWT-based authentication, BCrypt password hashing, role-based access control (RBAC), protected REST APIs, organization ownership authorization, and an admin-only dashboard.

This project was developed as part of my Software Engineering internship learning and practical development experience.

---

## Live Deployment

- **Live Application:** https://saa-s-flow-alpha.vercel.app
- **Backend API:** https://saasflow-production.up.railway.app
- **Source Code:** https://github.com/ishadi2002/SaaSFlow

### Deployment

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** Railway MySQL
- **Version Control:** GitHub

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
- Production CORS configuration
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

Only users with the `ADMIN` role can access admin backend functionality.

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

### Deployment & Development Tools

- Git
- GitHub
- Vercel
- Railway
- Railway MySQL
- VS Code

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

### Production Architecture

```text
User
  |
  v
Vercel
React Frontend
  |
  | HTTPS / REST API
  v
Railway
Spring Boot Backend
  |
  | Spring Data JPA
  v
Railway MySQL
```

---

## Backend Architecture

The backend uses a layered architecture:

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

Administrators have access to protected admin functionality in addition to normal authenticated functionality.

Admin access is protected by Spring Security role-based authorization.

Public registration does not allow users to assign themselves the `ADMIN` role.

---

## Security

SaaSFlow implements multiple backend security mechanisms.

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

### CORS Security

The backend is configured to allow requests from approved frontend origins, including the production Vercel application.

---

## Error Handling

The backend provides centralized exception handling.

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
  "errors": {
    "email": "Please provide a valid email",
    "password": "Password must be at least 8 characters"
  }
}
```

---

## Environment Variables

Sensitive configuration is managed using environment variables and is not committed to GitHub.

Production deployment uses variables such as:

```text
MYSQLHOST
MYSQLPORT
MYSQLDATABASE
MYSQLUSER
MYSQLPASSWORD
JWT_SECRET
PORT
```

Railway manages the production database connection and backend environment configuration.

Never commit real database passwords or JWT secrets to GitHub.

---

## Database Configuration

SaaSFlow uses MySQL for data persistence.

### Local Development

Create a local MySQL database:

```sql
CREATE DATABASE saasflow_db;
```

Configure the backend with the required local database connection values and environment variables.

### Production

The production application uses Railway MySQL.

Database credentials and connection details are provided securely through Railway environment variables.

Hibernate is configured to automatically update the database schema:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## Running the Project Locally

### 1. Clone the Repository

```powershell
git clone https://github.com/ishadi2002/SaaSFlow.git
cd SaaSFlow
```

### 2. Run the Backend

Navigate to the backend directory:

```powershell
cd backend
```

Configure the required database and JWT environment variables for your local environment.

Then start Spring Boot:

```powershell
.\mvnw spring-boot:run
```

The backend runs locally on:

```text
http://localhost:8081
```

### 3. Run the Frontend

Open another terminal and navigate to:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the Vite development server:

```powershell
npm run dev
```

Open the local URL displayed by Vite in the terminal.

---

## Production Deployment

### Frontend

The React frontend is deployed using Vercel.

**Live Application:**

https://saa-s-flow-alpha.vercel.app

### Backend

The Spring Boot REST API is deployed using Railway.

**Backend:**

https://saasflow-production.up.railway.app

### Database

The production MySQL database is hosted using Railway MySQL.

The frontend communicates with the Railway backend through HTTPS REST API requests.

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
- CORS configuration
- Git and GitHub version control
- Cloud database integration
- Frontend production deployment
- Backend production deployment
- Full-stack cloud deployment

---

## Future Improvements

Possible future improvements include:

- Refresh tokens
- Email verification
- Forgot/reset password
- User profile management
- Organization member management
- Subscription plan management
- Advanced admin analytics
- Audit logs
- Pagination and search
- Automated unit and integration testing
- Docker containerization
- CI/CD improvements

---

## Project Status

SaaSFlow core functionality and production deployment are complete.

- Authentication — Complete
- JWT Security — Complete
- BCrypt Password Security — Complete
- Organization CRUD — Complete
- User-specific Ownership — Complete
- Role-Based Access Control — Complete
- Admin Protection — Complete
- Backend Validation — Complete
- Error Handling — Complete
- React Frontend Integration — Complete
- Dashboard Integration — Complete
- Production Frontend Deployment — Complete
- Production Backend Deployment — Complete
- Cloud MySQL Integration — Complete
- GitHub Version Control — Complete

**Project Status: Production Deployed and Functional**

---

## Author

**Ishadi Lathinka**

Software System Technology Undergraduate  
University of Kelaniya