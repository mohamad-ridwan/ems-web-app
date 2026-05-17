# Implementation Plan: Refactoring UI into Reusable Components

## 1. Objective
Refactor existing UI templates across the micro frontend applications into reusable, global Angular components within a dedicated UI Kit library. This ensures consistency, reduces duplication, and adheres to the established MVVM and DDD architectural patterns.

## 2. Architecture & Design Patterns
- **Location:** The components will reside in a new Nx library located at `libs/shared/ui-kit/`. This aligns with the Nx workspace rule for storing shared features, UI components, and generic utilities.
- **MVVM (Model View ViewModel):** Each component will strictly separate concerns into distinct files:
  - `*.component.ts`: Handles the ViewModel/Component logic, state, and Angular metadata.
  - `*.view.html`: Handles the View/Template presentation.
  - `*.scss` / `*.css`: Handles the component-specific styling.
- **DDD (Domain Driven Design):** The UI Kit is treated as a shared core domain, accessible by all other feature domains (remote apps and shell).
- **Data Binding:** Use Angular `@Input()` properties extensively to pass data in and configure the components dynamically, making them purely presentational and highly reusable.

## 3. Scope of Reusable Components
The following core components will be created in the `ui-kit`:
1. **Input:** Standard text/number input fields with validation states.
2. **Regular Button:** Standard action buttons with primary, secondary, and outline variants.
3. **Button with Icon:** Buttons containing leading or trailing icons.
4. **Notification:** Toast, alert, or inline notification components for user feedback.

## 4. Step-by-Step Implementation

### Step 4.1: Generate the Shared UI Kit Library
Use the Nx generator to scaffold the new library within the `shared` directory.

```bash
npx nx g @nx/angular:library ui-kit --directory=libs/shared/ui-kit --standalone --style=scss --tags="scope:shared,type:ui"
```

### Step 4.2: Create Components following MVVM

For each component in the scope, generate the component and structure it according to the specified MVVM pattern.

#### Example Pattern: Input Component (`libs/shared/ui-kit/src/lib/input/`)
1. Generate component:
   ```bash
   npx nx g @nx/angular:component input --project=shared-ui-kit --export --style=scss
   ```
2. Restructure files to match MVVM:
   - Rename `input.component.html` to `input.view.html`
   - Update `input.component.ts` to reference `templateUrl: './input.view.html'`
3. Implement Logic (`input.component.ts`):
   Define necessary Angular `@Input()` props (e.g., `label`, `placeholder`, `type`, `value`, `disabled`, `errorMsg`).
4. Implement Template (`input.view.html`):
   Construct the HTML using Bootstrap 5 classes and bind the Angular props to the elements.

*This process will be repeated for the Regular Button, Button with Icon, and Notification components.*

### Step 4.3: Refactor Remote Apps and Shell App
Once the `ui-kit` library is implemented and exposes these components, update the consuming applications.

1. **Import Components:** In the relevant standalone components of the remote apps (e.g., `ems_add_employee`, `ems_list_employee`) and the shell app (`ems_dashboard`), import the newly created components from the shared UI Kit path mapping (e.g., `@ems-web-app/shared/ui-kit`).
2. **Replace Hardcoded UI:** Locate instances of native `<input>`, `<button>`, and hardcoded alert/notification HTML across the application templates (`*.view.html`).
3. **Integrate Reusable Components:** Replace the native HTML with the new UI Kit component tags (e.g., `<ems-input [label]="'Email'" [type]="'email'">`, `<ems-button [variant]="'primary'">`) and pass the required data via Angular property binding.

## 5. Verification & Testing
- Run `npx nx run-many -t lint` to ensure code style compliance.
- Run `npx nx run-many -t build` to ensure the shell and all remote apps compile successfully with the new shared dependency.
- Serve the application locally and verify that the UI remains visually consistent and that form inputs, buttons, and notifications function correctly across all micro frontends.
