import { Injectable, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from '../../data-access/employee.service';
import { Employee } from '../../domain/employee.model';
import { NotificationService } from '@org/shared-theme';

@Injectable()
export class EmployeeAddFacade {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  employeeForm: FormGroup;
  today: string;
  groups: string[] = [];
  groupSearch = signal('');
  showGroupDropdown = signal(false);
  selectedGroup = signal('');
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

  get f() {
    return this.employeeForm.controls;
  }

  get filteredGroups() {
    return this.groups.filter(g =>
      g.toLowerCase().includes(this.groupSearch().toLowerCase())
    );
  }

  selectGroup(group: string) {
    this.selectedGroup.set(group);
    this.groupSearch.set('');
    this.employeeForm.patchValue({ group: group });
    this.showGroupDropdown.set(false);
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    this.isSubmitting.set(true);

    const birthDateValue = this.employeeForm.get('birthDate')?.value;
    const employeeData: Employee = {
      ...this.employeeForm.value,
      password: birthDateValue
    };

    this.employeeService.addEmployee(employeeData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.notificationService.showNotification(
          'success',
          'Success!',
          'Employee added successfully! Redirecting...'
        );
        this.router.navigate(['/list-employee']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        const errMsg = err.error?.message;
        if (err.status === 400 && errMsg) {
          if (errMsg === 'Email is already registered') {
            this.employeeForm.get('email')?.setErrors({ duplicate: true });
            this.employeeForm.get('email')?.markAsTouched();
            this.notificationService.showNotification(
              'danger',
              'Error!',
              'Email is already registered.'
            );
          } else if (errMsg === 'Username is already taken') {
            this.employeeForm.get('username')?.setErrors({ duplicate: true });
            this.employeeForm.get('username')?.markAsTouched();
            this.notificationService.showNotification(
              'danger',
              'Error!',
              'Username is already taken.'
            );
          } else {
            this.notificationService.showNotification('danger', 'Error!', errMsg);
          }
        } else {
          this.notificationService.showNotification(
            'danger',
            'Error!',
            'Failed to add employee. Please check backend connection.'
          );
        }
        this.isSubmitting.set(false);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/list-employee']);
  }
}
