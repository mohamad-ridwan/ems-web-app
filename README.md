# Employee Management System (EMS) Web App

This repository contains the Employee Management System (EMS) Web Application, built with a modern Micro Frontend architecture using an Nx Monorepo.

## 🏗️ Architecture

The application is structured using **Domain-Driven Design (DDD)** and the **Model-View-ViewModel (MVVM)** design pattern to ensure scalability, maintainability, and clear separation of concerns.

### 1. Nx Monorepo & Micro Frontend (Module Federation)
The project utilizes **Nx** to manage a monorepo workspace. The frontend is built with **Angular** and decomposed into micro-frontends using **Module Federation**, allowing independent development and deployment of different features.

**Applications (`apps/`):**
- **`ems-dashboard` (Shell):** The main shell application that orchestrates and lazily loads all remote micro-frontends.
- **`ems-backend` (API):** The backend API built with **NestJS**, serving data to the frontends.
- **`ems_login` (Remote):** Micro-frontend handling user authentication.
- **`ems_list_employee` (Remote):** Micro-frontend displaying the paginated list of employees with search and filter features.
- **`ems_employee_detail` (Remote):** Micro-frontend displaying the detailed profile and salary data of an employee.
- **`ems_add_employee` (Remote):** Micro-frontend providing the form and validation to add a new employee.

### 2. Domain-Driven Design (DDD)
The codebase is modularized by domain, strictly separating business logic from UI components.
**Libraries (`libs/`):**
- Domain libraries (`ems_login`, `ems_list_employee`, `ems_employee_detail`, `ems_add_employee`) encapsulating domain-specific logic, UI components, and data access.
- **`shared`**: Contains shared core utilities, models, and UI components used across multiple micro-frontends.
- **`shared-theme`**: Houses the global enterprise-grade styling configurations based on **Bootstrap 5**.

### 3. MVVM Pattern (Model-View-ViewModel)
Each frontend module adheres to the MVVM architectural pattern:
- **Model:** Represents the data structure, DTOs, and API services communicating with the backend.
- **View:** The user interface built with Angular standalone components and styled with Bootstrap 5.
- **ViewModel:** The state management layer (implemented via Facades and RxJS) that binds the View to the Model, handling state persistence and user interactions reactively.

---

## 🛠️ Environment & Port Configurations

To run this application locally, ensure your environment meets the following prerequisites:
- **Node.js**: v20 or later
- **npm**: v10 or later
- **PostgreSQL**: A running instance is required for the NestJS backend API database (TypeORM). An exported backup of the database is provided in the `databases` directory.

---

### 🌐 Port & HTTP URL Mapping

Below is the network topology of all applications in the EMS micro-frontend ecosystem:

| Project Name | Type | Dev Server URL | Default Port | Description | Start Command |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`ems-backend`** | Backend API (NestJS) | `http://localhost:3400/api` | `3400` | Serves REST endpoints for authentication and employee management. | `npm run start-backend` |
| **`ems-dashboard`** | Host/Shell (Angular) | `http://localhost:4400` | `4400` | The main orchestrator that dynamically loads the remotes. | `npm run start-dashboard` |
| **`ems_login`** | Remote MFE (Angular) | `http://localhost:4401` | `4401` | Handles authentication, login views, and token storage. | `npm run start-login` |
| **`ems_add_employee`**| Remote MFE (Angular) | `http://localhost:4402` | `4402` | Renders employee onboarding forms and validations. | `npx nx serve ems_add_employee` |
| **`ems_list_employee`**| Remote MFE (Angular) | `http://localhost:4403` | `4403` | Renders the paginated employee directory with filters. | `npx nx serve ems_list_employee` |
| **`ems_employee_detail`**| Remote MFE (Angular) | `http://localhost:4404` | `4404` | Displays full employee profile cards and sensitive data. | `npx nx serve ems_employee_detail` |
| **PostgreSQL DB** | Database | `localhost:5432` | `5432` | Stores relational tables under database name `ems`. | *System Service* |

---

### ⚙️ Environment & Service Configurations

#### 1. Backend Configuration (`ems-backend`)
*   **Database Settings**: Connection parameters are defined in [app.module.ts](file:///Users/mac/ems-web-app/apps/ems-backend/src/app/app.module.ts):
    *   **Host**: `localhost`
    *   **Port**: `5432`
    *   **Username**: `postgres`
    *   **Password**: `password`
    *   **Database Name**: `ems`
*   **Server Port**: Can be customized using the `PORT` environment variable (defaults to `3400`).

#### 2. Frontend Configuration & API Endpoints
All Angular micro-apps are configured to consume the backend API through hardcoded service URLs (targeting `http://localhost:3400/api`). If the backend port is customized via the `PORT` environment variable, ensure these endpoints in the services under `libs/` are adjusted accordingly:
*   **Auth Service**: `http://localhost:3400/api/auth` (defined in [auth.service.ts](file:///Users/mac/ems-web-app/libs/ems_login/src/lib/data-access/auth.service.ts))
*   **Employee Service**: `http://localhost:3400/api/employee` (defined in employee services in `libs/ems_add_employee`, `libs/ems_employee_detail`, and `libs/ems_list_employee`)

#### 3. Module Federation Modes
Nx Module Federation lets you run the host shell while running remotes either as **static assets** (faster, lightweight proxy) or as **active dev-servers** (enables hot-reload for that remote). You can configure this via the following commands:
*   **Static Mode** (Default): Run `npm run start-dashboard`. Starts the Host on `http://localhost:4400` and serves the remotes statically on port `4405`.
*   **Full Active Dev Mode**: Run `npm run start-dashboard-dev-all`. Boots up the Host along with all 4 remotes (`ems_login`, `ems_add_employee`, `ems_list_employee`, `ems_employee_detail`) in active dev mode with live-reloads on their respective ports.
*   **Single-Feature Dev Mode**: Run `npm run start-dashboard-dev-login`. Boots up the host shell with only the `ems_login` remote in active development mode, while others remain static.

---

## 🚀 How to Run the Application

### 1. Install Dependencies
Clone the repository and install all necessary dependencies using npm:
```bash
npm install
```

### 2. Set Up the Database
This application requires a PostgreSQL database to run. A pre-configured database export is located in the `databases` directory. 
Please restore this export to your local PostgreSQL instance and ensure your credentials match the ones in `apps/ems-backend/src/app/app.module.ts`.

### 3. Start the Backend API
Start the NestJS backend service. It will run by default on `http://localhost:3400/api`.
```bash
npm run start-backend
# Alternatively: nx serve ems-backend
```

### 4. Start the Frontend Application
Start the Angular Shell (`ems-dashboard`) along with all its remote micro-frontends. The Nx Module Federation dev-server will automatically handle starting the static proxies for the remote apps.
Open a **new terminal** and run:
```bash
npm run start-dashboard
# Alternatively: nx serve ems-dashboard
```

### 5. Access the App
Once the dev-servers are ready, open your web browser and navigate to:
**http://localhost:4400**

### 🔑 Demo Login Credentials
Use the following credentials to log in and manage employee data (this account is registered as an employee with the **Operations** position):

- **Username:** `user9`
- **Password:** `1990-01-10`
