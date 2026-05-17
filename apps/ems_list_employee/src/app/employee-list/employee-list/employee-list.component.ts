import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeListViewModel } from './employee-list.viewmodel';
import { EmployeeTableComponent } from '../ui/employee-table.component';
import { Employee } from '../domain/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeTableComponent],
  providers: [EmployeeListViewModel],
  template: `
    <div class="container-fluid p-3 p-md-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
        <h2 class="h4 mb-0 text-primary fw-bold text-center text-md-start">Employee Management</h2>
        <button class="btn btn-primary px-4" (click)="goToAddEmployee()">
          <i class="bi bi-plus-lg me-2"></i> Add Employee
        </button>
      </div>

      <!-- Notifications -->
      <div *ngIf="notification()" class="alert alert-dismissible fade show shadow-sm" 
           [ngClass]="notification()?.type === 'edit' ? 'alert-warning' : 'alert-danger'" role="alert">
        <strong>{{ notification()?.type === 'edit' ? 'Edit' : 'Delete' }} Action!</strong> 
        {{ notification()?.message }}
        <button type="button" class="btn-close" (click)="clearNotification()"></button>
      </div>

      <!-- Filters -->
      <div class="card mb-4 border-0 shadow-sm">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-12 col-md-4">
              <label class="form-label small text-muted fw-bold">First Name</label>
              <input type="text" class="form-control" placeholder="Search first name..." 
                     [ngModel]="vm.searchFirstName()" (ngModelChange)="vm.searchFirstName.set($event)">
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label small text-muted fw-bold">Last Name</label>
              <input type="text" class="form-control" placeholder="Search last name..." 
                     [ngModel]="vm.searchLastName()" (ngModelChange)="vm.searchLastName.set($event)">
            </div>
            <div class="col-12 col-md-4 d-flex align-items-end">
              <div class="w-100">
                <label class="form-label small text-muted fw-bold">Items per page</label>
                <select class="form-select" [ngModel]="vm.pageSize()" (ngModelChange)="vm.setPageSize($event)">
                  <option [ngValue]="5">5</option>
                  <option [ngValue]="10">10</option>
                  <option [ngValue]="20">20</option>
                  <option [ngValue]="50">50</option>
                  <option [ngValue]="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card border-0 shadow-sm overflow-hidden mb-4">
        <div *ngIf="vm.loading()" class="p-5 text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <app-employee-table *ngIf="!vm.loading()"
          [employees]="vm.pagedEmployees()"
          (sort)="vm.toggleSort($event)"
          (detail)="onDetail($event)"
          (edit)="onEdit($event)"
          (delete)="onDelete($event)">
        </app-employee-table>
      </div>

      <!-- Pagination -->
      <nav *ngIf="!vm.loading() && vm.totalPages() > 1" class="d-flex justify-content-center overflow-auto py-2">
        <ul class="pagination pagination-sm shadow-sm mb-0">
          <li class="page-item" [class.disabled]="vm.currentPage() === 1">
            <a class="page-link" (click)="vm.setPage(vm.currentPage() - 1)" style="cursor: pointer;">
              <span class="d-none d-sm-inline">Previous</span>
              <span class="d-inline d-sm-none">&laquo;</span>
            </a>
          </li>
          <li class="page-item" *ngFor="let p of [].constructor(vm.totalPages()); let i = index" 
              [class.active]="vm.currentPage() === i + 1">
            <a class="page-link" (click)="vm.setPage(i + 1)" style="cursor: pointer;">{{ i + 1 }}</a>
          </li>
          <li class="page-item" [class.disabled]="vm.currentPage() === vm.totalPages()">
            <a class="page-link" (click)="vm.setPage(vm.currentPage() + 1)" style="cursor: pointer;">
              <span class="d-none d-sm-inline">Next</span>
              <span class="d-inline d-sm-none">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="text-center text-muted small mt-2">
        Showing {{ vm.pagedEmployees().length }} of {{ vm.totalItems() }} records
      </div>
    </div>
  `
})
export class EmployeeListComponent {
  vm = inject(EmployeeListViewModel);
  private router = inject(Router);

  notification = signal<{ type: 'edit' | 'delete', message: string } | null>(null);

  onDetail(emp: Employee) {
    this.router.navigate(['/employee-detail', emp.email]);
  }

  onEdit(emp: Employee) {
    this.notification.set({
      type: 'edit',
      message: `Editing employee: ${emp.firstName} ${emp.lastName} (${emp.username})`
    });
    setTimeout(() => this.clearNotification(), 3000);
  }

  onDelete(emp: Employee) {
    this.notification.set({
      type: 'delete',
      message: `Deleting employee: ${emp.firstName} ${emp.lastName} (${emp.username})`
    });
    setTimeout(() => this.clearNotification(), 3000);
  }

  clearNotification() {
    this.notification.set(null);
  }

  goToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }
}
