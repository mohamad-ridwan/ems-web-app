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

## 🛠️ Environment Requirements

To run this application locally, ensure your environment meets the following prerequisites:
- **Node.js**: v20 or later
- **npm**: v10 or later
- **PostgreSQL**: A running instance is required for the NestJS backend API database (TypeORM).

---

## 🚀 How to Run the Application

### 1. Install Dependencies
Clone the repository and install all necessary dependencies using npm:
```bash
npm install
```

### 2. Start the Backend API
Start the NestJS backend service. It will run by default on `http://localhost:3400/api`.
```bash
npm run start-backend
# Alternatively: nx serve ems-backend
```

### 3. Start the Frontend Application
Start the Angular Shell (`ems-dashboard`) along with all its remote micro-frontends. The Nx Module Federation dev-server will automatically handle starting the static proxies for the remote apps.
Open a **new terminal** and run:
```bash
npm run start-dashboard
# Alternatively: nx serve ems-dashboard
```

### 4. Access the App
Once the dev-servers are ready, open your web browser and navigate to:
**http://localhost:4400**
