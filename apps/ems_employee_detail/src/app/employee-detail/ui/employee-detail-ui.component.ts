import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Employee } from '../domain/employee.model';

@Component({
  selector: 'app-employee-detail-ui',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm border-0" *ngIf="employee">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
        <h5 class="mb-0 fw-bold">Employee Detail</h5>
        <span class="badge bg-light text-primary px-3 py-2">{{ employee.status }}</span>
      </div>
      <div class="card-body p-4">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="detail-group mb-3">
              <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Full Name</span>
              <p class="fs-5 mb-0 fw-semibold">{{ employee.firstName }} {{ employee.lastName }}</p>
            </div>
            <div class="detail-group mb-3">
              <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Username</span>
              <p class="fs-6 mb-0">{{ employee.username }}</p>
            </div>
            <div class="detail-group mb-3">
              <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Email Address</span>
              <p class="fs-6 mb-0 text-primary">{{ employee.email }}</p>
            </div>
          </div>
          <div class="col-md-6 border-start ps-md-4">
            <div class="detail-group mb-3">
              <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Basic Salary</span>
              <p class="fs-5 mb-0 fw-bold text-success">{{ formatCurrency(employee.basicSalary) }}</p>
            </div>
            <div class="detail-group mb-3">
              <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Group</span>
              <p class="fs-6 mb-0">{{ employee.group }}</p>
            </div>
            <div class="detail-group mb-3">
              <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Birth Date</span>
              <p class="fs-6 mb-0">{{ employee.birthDate | date:'dd MMMM yyyy' }}</p>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-top d-flex justify-content-end">
          <button type="button" class="btn btn-outline-secondary px-4 py-2 me-2" (click)="onBack.emit()">
            <i class="bi bi-arrow-left me-2"></i> Cancel
          </button>
          <button type="button" class="btn btn-primary px-5 py-2 fw-bold" (click)="onBack.emit()">
            OK
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-group span {
      letter-spacing: 0.5px;
    }
  `]
})
export class EmployeeDetailUiComponent {
  @Input() employee: Employee | null = null;
  @Output() onBack = new EventEmitter<void>();

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(value).replace('IDR', 'Rp.');
  }
}
