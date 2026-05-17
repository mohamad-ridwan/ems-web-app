import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../domain/employee.model';

@Component({
  selector: 'app-employee-detail-ui',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (employee) {
      <div class="card shadow-sm border-0">
        <div class="card-body p-3 p-md-4">
          <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
            <h5 class="mb-0 fw-bold text-secondary">Employee Information</h5>
            <span class="badge bg-primary px-3 py-2 fs-6">{{ employee.status }}</span>
          </div>

          <div class="row g-4">
            <div class="col-md-6">
              <div class="detail-group mb-3">
                <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Full Name</span>
                <p class="fs-5 mb-0 fw-semibold text-dark">{{ employee.firstName }} {{ employee.lastName }}</p>
              </div>
              <div class="detail-group mb-3">
                <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Username</span>
                <p class="fs-6 mb-0 text-dark">{{ employee.username }}</p>
              </div>
              <div class="detail-group mb-3">
                <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Email Address</span>
                <p class="fs-6 mb-0 text-primary fw-medium">{{ employee.email }}</p>
              </div>
            </div>
            <div class="col-md-6 border-md-start ps-md-4">
              <div class="detail-group mb-3">
                <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Basic Salary</span>
                <p class="fs-5 mb-0 fw-bold text-success">{{ formatCurrency(employee.basicSalary) }}</p>
              </div>
              <div class="detail-group mb-3">
                <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Group</span>
                <p class="fs-6 mb-0 text-dark">{{ employee.group }}</p>
              </div>
              <div class="detail-group mb-3">
                <span class="text-muted small text-uppercase fw-bold mb-1 d-block">Birth Date</span>
                <p class="fs-6 mb-0 text-dark">{{ employee.birthDate | date:'dd MMMM yyyy' }}</p>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-4 border-top d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-secondary px-4" (click)="back.emit()">
              <i class="bi bi-arrow-left me-2"></i> Cancel
            </button>
            <button type="button" class="btn btn-primary px-4 fw-bold" (click)="back.emit()">
              OK
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .detail-group span {
      letter-spacing: 0.5px;
    }
    @media (min-width: 768px) {
      .border-md-start {
        border-left: 1px solid var(--bs-border-color, #dee2e6) !important;
      }
    }
  `]
})
export class EmployeeDetailUiComponent {
  @Input() employee: Employee | null = null;
  @Output() back = new EventEmitter<void>();

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(value).replace('IDR', 'Rp.');
  }
}
