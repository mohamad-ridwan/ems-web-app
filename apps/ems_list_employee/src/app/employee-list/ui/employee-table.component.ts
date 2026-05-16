import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../domain/employee.model';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-responsive" style="padding: 16px;">
      <table class="table table-hover table-striped border">
        <thead class="table-light">
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
              <button class="btn btn-sm btn-warning me-2" (click)="edit.emit(emp)">
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
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();
}
