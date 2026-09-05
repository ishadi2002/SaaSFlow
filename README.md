# SaaSFlow

SaaSFlow is a secure full-stack SaaS workspace management system developed using React, Spring Boot, and MySQL.

The system allows users to register, log in securely, and manage their own organizations. It includes JWT-based authentication, BCrypt password hashing, protected REST APIs, role-based access control, and an ADMIN-only dashboard.

---

## Features

### Authentication & Security
- User registration
- Secure login
- BCrypt password hashing
- JWT authentication
- 24-hour token expiration
- Protected API endpoints
- Stateless authentication
- USER and ADMIN roles
- Role-based access control
- Backend validation
- Centralized exception handling

### Organization Management
- Create organizations
- View user-specific organizations
- Update organizations
- Delete organizations
- Organization ownership protection
- Unauthorized users cannot modify another user's organizations

### Dashboard
- Real organization count
- Recent organization activity
- Authentication status
- Security status
- Backend API connection status
- Quick navigation

### Admin Dashboard
- Protected ADMIN-only endpoint
- Backend role verification
- Access denied for normal users
- Secure admin dashboard

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

## Project Structure

```text
SaaSFlow/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Backend Architecture

The backend follows a layered architecture:

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL Database
```

Main packages:

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

---

## Authentication Flow

```text
User Login
   ↓
Spring Boot Backend
   ↓
Verify BCrypt Password
   ↓
Generate JWT Token
   ↓
Frontend stores token
   ↓
Axios sends Bearer Token
   ↓
Protected API Access
```

Protected requests use:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## REST API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |

### Organizations

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/organizations` | Get user's organizations | Authenticated |
| POST | `/api/organizations` | Create organization | Authenticated |
| PUT | `/api/organizations/{id}` | Update organization | Owner only |
| DELETE | `/api/organizations/{id}` | Delete organization | Owner only |

### Admin

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/dashboard` | Admin dashboard | ADMIN only |

---

## User Roles

### USER

Newly registered users receive the `USER` role automatically.

Users can:
- Login
- Access the dashboard
- Create organizations
- View their organizations
- Update their organizations
- Delete their organizations

### ADMIN

ADMIN users can access protected administrator functionality.

Admin access is secured using:

```java
@PreAuthorize("hasRole('ADMIN')")
```

Users cannot assign themselves the ADMIN role through public registration.

---

## Security

### BCrypt Password Hashing

Passwords are hashed before being stored in MySQL.

Plain-text passwords are not stored.

### JWT Authentication

JWT tokens are generated after successful login.

Token expiration:

```text
24 hours
```

Invalid or expired tokens cannot authenticate protected requests.

### Resource Ownership

Before updating or deleting an organization, the backend verifies that the authenticated user owns that organization.

### Error Handling

The backend includes centralized exception handling.

| Status | Meaning |
|---|---|
| 400 | Bad Request / Validation Error |
| 401 | Authentication Required |
| 403 | Forbidden |
| 404 | Resource Not Found |

Example validation response:

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

The backend uses environment variables for sensitive information.

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

Do not commit real credentials or secret keys to GitHub.

---

## Database Setup

Create the MySQL database:

```sql
CREATE DATABASE saasflow_db;
```

Backend configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/saasflow_db
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
```

---

## Run the Backend

```powershell
cd backend
```

Set environment variables:

```powershell
$env:DB_PASSWORD="YOUR_DATABASE_PASSWORD"
$env:JWT_SECRET="YOUR_SECURE_JWT_SECRET"
```

Run Spring Boot:

```powershell
.\mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8081
```

---

## Run the Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite development URL shown in the terminal.

---

## Screenshots

You can add screenshots here later.

Suggested screenshots:

- Login page
- Register page
- User dashboard
- Organizations page
- Admin dashboard
- Access denied page

---

## Key Learning Outcomes

This project demonstrates practical experience with:

- Full-stack software development
- React frontend development
- Spring Boot REST API development
- MySQL integration
- JWT authentication
- Spring Security
- BCrypt password hashing
- Role-based access control
- CRUD operations
- Resource ownership authorization
- API validation
- Centralized exception handling
- Frontend-backend integration
- Git and GitHub version control

---

## Future Improvements

Possible future improvements include:

- Email verification
- Forgot password and password reset
- Refresh tokens
- User profile management
- Organization member management
- Search and pagination
- Audit logs
- Automated testing
- Docker deployment
- Cloud deployment

---

## Project Status

Core functionality is complete and tested.

- Authentication ✅
- JWT Security ✅
- Organization CRUD ✅
- User-specific ownership ✅
- Role-Based Access Control ✅
- Admin protection ✅
- Backend validation ✅
- Error handling ✅
- React frontend integration ✅
- GitHub version control ✅

---

## Author

**Ishadi Lathinka**

Software System Technology Undergraduate  
University of Kelaniya