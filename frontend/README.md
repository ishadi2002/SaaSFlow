# SaaSFlow

SaaSFlow is a secure full-stack subscription-based SaaS workspace management application developed using Spring Boot, React, and MySQL.

The system allows users to create accounts, securely log in, manage organizations, select subscription plans, switch or cancel subscriptions, and access features according to their active plan.

SaaSFlow implements JWT authentication, BCrypt password hashing, role-based access control (RBAC), subscription-based access control, protected REST APIs, organization ownership authorization, and an admin-only dashboard.

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

### Subscription Management

SaaSFlow includes a complete subscription-based SaaS workflow.

Available plans:

| Plan | Price | Features |
|---|---:|---|
| FREE | $0.00/month | Basic workspace access and limited features |
| BASIC | $9.99/month | Organization management and standard features |
| PREMIUM | $19.99/month | Full access, premium content, and advanced features |

Users can:

- View available subscription plans
- Subscribe to a plan
- View their current subscription
- Switch or upgrade subscription plans
- Cancel an active subscription
- Access features according to the active plan
- Access premium-only content when subscribed to PREMIUM

### Plan-Based Access Control

The backend enforces subscription-based authorization.

- FREE users cannot access premium-only resources
- BASIC users cannot access premium-only resources
- PREMIUM users can access premium-only resources
- Subscription validation is performed by the backend
- Unauthorized premium access returns `403 Forbidden`

This ensures that premium functionality cannot be accessed simply by modifying the frontend.

### Organization Management

Authenticated users can manage their own organizations.

- Create an organization
- View organizations
- Update an organization
- Delete an organization
- User-specific organization ownership
- Unauthorized users cannot update or delete another user's organizations

### Dashboard

The application provides authenticated dashboard functionality.

- Protected dashboard API
- Total organization count
- Recent organization activity
- Authentication status
- Security status
- Backend API connection status
- Quick navigation actions

### User Profile

Authenticated users can access their profile information through a protected backend endpoint.

The profile API provides authenticated user information such as:

- User ID
- Name
- Email
- Role

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
- Postman

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

The frontend uses separate CSS files for major pages and layouts to keep the UI organized and maintainable.

---

## REST API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |

### User

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/profile` | Get authenticated user profile | Authenticated |
| GET | `/api/dashboard` | Get authenticated dashboard data | Authenticated |

### Subscription Plans

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/plans` | View available subscription plans | Public |

### Subscription Management

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/subscribe` | Subscribe to a plan | Authenticated |
| GET | `/api/subscription` | View current subscription | Authenticated |
| PUT | `/api/upgrade-plan` | Switch or upgrade subscription plan | Authenticated |
| DELETE | `/api/cancel-subscription` | Cancel active subscription | Authenticated |
| GET | `/api/premium-content` | Access premium-only content | PREMIUM only |

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
- Access their profile
- Access their dashboard
- View subscription plans
- Manage their subscription
- Create organizations
- View their organizations
- Update their organizations
- Delete their organizations
- Access features allowed by their active subscription

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

### Subscription-Based Access Control

SaaSFlow implements plan-based authorization in addition to role-based access control.

Premium resources verify the authenticated user's active subscription before granting access.

```text
FREE     -> Premium access denied
BASIC    -> Premium access denied
PREMIUM  -> Premium access granted
```

A FREE or BASIC user attempting to access:

```text
GET /api/premium-content
```

receives:

```text
403 Forbidden
```

A user with an active PREMIUM subscription receives:

```text
200 OK
```

This access control is enforced by the backend.

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
| 200 | Request Successful |
| 201 | Resource Created |
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

Main application data includes:

- Users
- Organizations
- Subscription plans
- User subscriptions

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

Example:

```powershell
$env:DB_PASSWORD="YOUR_LOCAL_DATABASE_PASSWORD"
$env:JWT_SECRET="YOUR_SECURE_JWT_SECRET"
```

Do not commit these values to GitHub.

Start Spring Boot:

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

**Backend API:**

https://saasflow-production.up.railway.app

### Database

The production MySQL database is hosted using Railway MySQL.

The frontend communicates with the Railway backend through HTTPS REST API requests.

---

## Testing & Verification

The core SaaS functionality has been tested during development.

### Authentication

- Registration works
- Login works
- JWT authentication works
- Protected endpoints reject unauthorized access

### Subscription Workflow

- Plans load successfully
- Users can subscribe
- Users can switch plans
- Users can upgrade to PREMIUM
- Users can cancel subscriptions
- Current subscription status is available

### Plan-Based Security

Verified behavior:

```text
FREE/BASIC + /api/premium-content
-> 403 Forbidden

PREMIUM + /api/premium-content
-> 200 OK
```

### Production Verification

The deployed application has also been verified with:

- Vercel frontend
- Railway backend
- Railway MySQL
- Frontend-to-backend API communication
- Production subscription plan loading
- Production subscription management

---

## Main Learning Outcomes

This project demonstrates practical experience with:

- Full-stack application development
- Subscription-based SaaS development
- REST API development
- React frontend development
- Spring Boot backend development
- MySQL database integration
- JWT authentication
- Spring Security
- BCrypt password hashing
- Role-based access control
- Plan-based access control
- Subscription lifecycle management
- Premium feature authorization
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

- Payment gateway integration
- Automated recurring billing
- Refresh tokens
- Email verification
- Forgot/reset password
- Extended user profile management
- Organization member management
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
- User Profile API — Complete
- Dashboard API — Complete
- Organization CRUD — Complete
- User-specific Ownership — Complete
- Role-Based Access Control — Complete
- Admin Protection — Complete
- Subscription Plans — Complete
- Subscribe / Switch / Upgrade — Complete
- Subscription Cancellation — Complete
- Subscription Status Management — Complete
- Plan-Based Access Control — Complete
- Premium Content Protection — Complete
- Backend Validation — Complete
- Error Handling — Complete
- React Frontend Integration — Complete
- Subscription UI — Complete
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