import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Employee } from '../domain/employee.model';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-responsive" style="padding: 16px;">
      <table class="table table-hover table-striped border table-enterprise">
        <thead>
          <tr>
            <th (click)="sort.emit('username')" style="cursor: pointer;">
              Username <i class="bi bi-arrow-down-up small ms-1"></i>
            </th>
            <th (click)="sort.emit('firstName')" style="cursor: pointer;">
              First Name <i class="bi bi-arrow-down-up small ms-1"></i>
            </th>
            <th (click)="sort.emit('lastName')" style="cursor: pointer;">
              Last Name <i class="bi bi-arrow-down-up small ms-1"></i>
            </th>
            <th (click)="sort.emit('email')" style="cursor: pointer;">
              Email <i class="bi bi-arrow-down-up small ms-1"></i>
            </th>
            <th (click)="sort.emit('status')" style="cursor: pointer;">
              Status <i class="bi bi-arrow-down-up small ms-1"></i>
            </th>
            <th (click)="sort.emit('group')" style="cursor: pointer;">
              Group <i class="bi bi-arrow-down-up small ms-1"></i>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="employees.length === 0">
            <td colspan="7" class="text-center py-5 text-muted">
              <div class="py-3">
                <i class="bi bi-search display-5 d-block mb-3 text-secondary opacity-75"></i>
                <span class="fw-bold fs-5 text-dark d-block">Pencarian tidak ditemukan</span>
                <p class="small text-muted mt-2 mb-0">Tidak ada data karyawan yang cocok dengan filter pencarian Anda.</p>
              </div>
            </td>
          </tr>
          <tr *ngFor="let emp of employees">
            <td>{{ emp.username }}</td>
            <td>{{ emp.firstName }}</td>
            <td>{{ emp.lastName }}</td>
            <td>{{ emp.email }}</td>
            <td>
              <span class="badge rounded-pill" [ngClass]="{
                'bg-success': emp.status === 'Active',
                'bg-secondary': emp.status === 'Resigned',
                'bg-warning text-dark': emp.status === 'On Leave'
              }">{{ emp.status }}</span>
            </td>
            <td>{{ emp.group }}</td>
            <td class="text-nowrap">
              <button class="btn btn-sm btn-warning me-2" (click)="navigateToDetail(emp.id)">
                <i class="bi bi-pencil"></i> <span class="d-none d-md-inline">Edit</span>
              </button>
              <button class="btn btn-sm btn-danger" (click)="delete.emit(emp)">
                <i class="bi bi-trash"></i> <span class="d-none d-md-inline">Delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Output() sort = new EventEmitter<keyof Employee>();
  @Output() detail = new EventEmitter<Employee>();
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();

  private router = inject(Router);

  navigateToDetail(id?: number) {
    if (id !== undefined) {
      this.router.navigate(['/detail-employee', id]);
    }
  }
}
