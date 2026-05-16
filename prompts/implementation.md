# Implementation Plan: List Employee Micro Frontend

This document outlines the steps to implement the `ems-list-employee` micro frontend within the Nx workspace, adhering to the established DDD and MVVM patterns, and utilizing Bootstrap 5 for UI consistency.

## 1. Backend Implementation (`ems-backend`)

### 1.1 API Endpoint Definition
Create a new GET endpoint to retrieve the list of employees.

- **Endpoint:** `GET /api/employee/list`
- **Controller/Service location:** Appropriate module in `apps/ems-backend`

### 1.2 Data Model
The API should support returning objects with the following fields:
- `username` (string)
- `firstName` (string)
- `lastName` (string)
- `password` (string)
- `email` (string)
- `birthDate` (datetime)
- `basicSalary` (double)
- `status` (string)
- `group` (string)
- `description` (datetime) // Assuming datetime based on prompt, though string/text might be expected in practice

## 2. Frontend Implementation (`ems-list-employee` Remote App)

### 2.1 Scaffolding the Remote App
- Generate a new Angular remote application named `ems-list-employee` using the latest Angular version (v21).
- Utilize the `@nx/module-federation/angular` plugin for integration.

### 2.2 Shell App Integration (`ems-dashboard`)
- Update the shell application (`ems-dashboard`) routing configuration.
- Add route `"/list-employee"` to lazy-load the remote app `ems-list-employee`.

### 2.3 Styling and UI Framework
- Use **Bootstrap 5** for all styling.
- Maintain consistent "enterprise" styling matching the rest of the application.

### 2.4 Domain-Driven Design (DDD) & MVVM Structure
Organize the source code following the standard DDD and MVVM folder structure:

```text
employee-list/             # DOMAIN: Fitur list employee
   ├─ employee-list/       # ViewModel: Logic List Employee
   ├─ ui/                  # View: Komponen presentasi (dumb components)
   ├─ data-access/         # Model: NgRx State, Services, API Calls
   ├─ domain/              # Model: Interfaces, DTOs, Business Logic
```

### 2.5 Features to Implement
Implement the following features in the View and ViewModel:

1. **Dummy Data:** Display at least 100 dummy records retrieved from the backend or mocked in the data-access layer.
2. **Paging:** 
   - Implement data pagination.
   - Include a dropdown/selector to adjust the number of items per page.
3. **Sorting:** Allow sorting on table columns.
4. **Searching/Filtering:** 
   - Provide search inputs for at least two different parameters.
   - Apply an **AND** rule when filtering by these parameters.
5. **Add Button:** Include an "Add Employee" button that navigates to the Add Employee Page.
6. **Action Column:** 
   - Add a column with dummy "Edit" and "Delete" buttons for each row.
   - Triggering "Edit" shows a notification with a **yellow** color.
   - Triggering "Delete" shows a notification with a **red** color.
