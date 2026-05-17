import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../data-access/employee.service';
import { Employee } from '../domain/employee.model';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container-fluid p-3 p-md-4">
      <div class="mb-4">
        <h2 class="h4 mb-0 text-primary fw-bold text-center text-md-start">Add New Employee</h2>
      </div>
      <div class="card shadow-sm border-0">
        <div class="card-body p-3 p-md-4">
          <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
            <div class="row g-3">
              <!-- Username -->
              <div class="col-md-6">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" class="form-control" formControlName="username" 
                       [class.is-invalid]="f['username'].invalid && f['username'].touched">
                <div class="invalid-feedback">Username is required</div>
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" formControlName="email"
                       [class.is-invalid]="f['email'].invalid && f['email'].touched">
                <div class="invalid-feedback">
                  {{ f['email'].errors?.['required'] ? 'Email is required' : 'Invalid email format' }}
                </div>
              </div>

              <!-- First Name -->
              <div class="col-md-6">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" id="firstName" class="form-control" formControlName="firstName"
                       [class.is-invalid]="f['firstName'].invalid && f['firstName'].touched">
                <div class="invalid-feedback">First name is required</div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" id="lastName" class="form-control" formControlName="lastName"
                       [class.is-invalid]="f['lastName'].invalid && f['lastName'].touched">
                <div class="invalid-feedback">Last name is required</div>
              </div>

              <!-- Password -->
              <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input type="text" [maxLength]="0" id="password" class="form-control bg-light text-muted" value="Password otomatis dibuat saat Submit" disabled style="cursor: not-allowed; user-select: none;">
              </div>

              <!-- Birth Date -->
              <div class="col-md-6">
                <label for="birthDate" class="form-label">Birth Date</label>
                <input type="date" id="birthDate" class="form-control" formControlName="birthDate"
                       [max]="today"
                       [class.is-invalid]="f['birthDate'].invalid && f['birthDate'].touched">
                <div class="invalid-feedback">
                  {{ f['birthDate'].errors?.['required'] ? 'Birth date is required' : 'Birth date cannot be in the future' }}
                </div>
              </div>

              <!-- Basic Salary -->
              <div class="col-md-6">
                <label for="basicSalary" class="form-label">Basic Salary</label>
                <div class="input-group">
                  <span class="input-group-text">Rp</span>
                  <input type="number" id="basicSalary" class="form-control" formControlName="basicSalary"
                         [class.is-invalid]="f['basicSalary'].invalid && f['basicSalary'].touched">
                  <div class="invalid-feedback">Salary must be a valid number</div>
                </div>
              </div>

              <!-- Status -->
              <div class="col-md-6">
                <label for="status" class="form-label">Status</label>
                <select id="status" class="form-select" formControlName="status"
                        [class.is-invalid]="f['status'].invalid && f['status'].touched">
                  <option value="" disabled selected>Select Status</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Probation">Probation</option>
                </select>
                <div class="invalid-feedback">Status is required</div>
              </div>

              <!-- Group (Searchable Dropdown) -->
              <div class="col-md-6">
                <label for="group" class="form-label">Group</label>
                <div class="dropdown" (clickOutside)="showGroupDropdown = false">
                  <input type="text" class="form-control" 
                         [placeholder]="selectedGroup || 'Search and Select Group...'"
                         (focus)="showGroupDropdown = true"
                         [(ngModel)]="groupSearch"
                         [ngModelOptions]="{standalone: true}"
                         [class.is-invalid]="f['group'].invalid && f['group'].touched">
                  <div class="dropdown-menu w-100 p-2 shadow" [class.show]="showGroupDropdown" style="max-height: 200px; overflow-y: auto;">
                    @for (group of filteredGroups; track group) {
                      <button type="button" class="dropdown-item" (click)="selectGroup(group)">
                        {{ group }}
                      </button>
                    }
                    @if (filteredGroups.length === 0) {
                      <div class="px-3 text-muted">No groups found</div>
                    }
                  </div>
                  <input type="hidden" formControlName="group">
                </div>
                @if (f['group'].invalid && f['group'].touched) {
                  <div class="invalid-feedback d-block">
                    Group is required
                  </div>
                }
              </div>

              <!-- Description (Date) -->
              <div class="col-md-6">
                <label for="description" class="form-label">Description Date</label>
                <input type="date" id="description" class="form-control" formControlName="description"
                       [class.is-invalid]="f['description'].invalid && f['description'].touched">
                <div class="invalid-feedback">Description date is required</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex justify-content-end gap-3 mt-5 pt-3 border-top">
              <button type="button" class="btn btn-outline-secondary px-4" (click)="onCancel()">
                <i class="bi bi-x-circle me-2"></i>Cancel
              </button>
              <button type="submit" class="btn btn-primary px-4" [disabled]="employeeForm.invalid || isSubmitting()">
                @if (isSubmitting()) {
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <span>Saving...</span>
                } @else {
                  <i class="bi bi-save me-2"></i>
                  <span>Save</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropdown-menu.show {
      display: block;
    }
  `]
})
export class EmployeeAddComponent {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  employeeForm: FormGroup;
  today: string;
  groups: string[] = [];
  groupSearch = '';
  showGroupDropdown = false;
  selectedGroup = '';
  isSubmitting = signal(false);

  constructor() {
    this.today = new Date().toISOString().split('T')[0];
    this.groups = this.employeeService.getGroups();
    
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      basicSalary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() { return this.employeeForm.controls; }

  get filteredGroups() {
    return this.groups.filter(g => g.toLowerCase().includes(this.groupSearch.toLowerCase()));
  }

  selectGroup(group: string) {
    this.selectedGroup = group;
    this.groupSearch = '';
    this.employeeForm.patchValue({ group: group });
    this.showGroupDropdown = false;
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    this.isSubmitting.set(true);
    
    // Construct the payload by taking form values and overriding password with birthDateValue.
    // This avoids mutating the form control's state, preventing DOM manipulation during loading.
    const birthDateValue = this.employeeForm.get('birthDate')?.value;
    const employeeData: Employee = {
      ...this.employeeForm.value,
      password: birthDateValue
    };
    
    this.employeeService.addEmployee(employeeData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        alert('Employee added successfully!');
        this.router.navigate(['/list-employee']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add employee. Please check backend connection.');
        this.isSubmitting.set(false);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/list-employee']);
  }
}
