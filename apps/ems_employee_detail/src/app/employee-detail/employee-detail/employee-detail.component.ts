import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../data-access/employee.service';
import { Employee } from '../domain/employee.model';
import { EmployeeDetailUiComponent } from '../ui/employee-detail-ui.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, EmployeeDetailUiComponent],
  template: `
    <div class="container-fluid p-3 p-md-4">
      <div class="mb-4">
        <h2 class="h4 mb-0 text-primary fw-bold text-center text-md-start">Employee Detail</h2>
      </div>

      <ng-container *ngIf="employee$ | async as employee; else loading">
        <app-employee-detail-ui 
          [employee]="employee"
          (onBack)="goBack()">
        </app-employee-detail-ui>
      </ng-container>

      <ng-template #loading>
        <div class="card border-0 shadow-sm">
          <div class="card-body p-5 text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-muted mb-0">Fetching employee data...</p>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class EmployeeDetailComponent implements OnInit {
  employee$!: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee$ = this.employeeService.getEmployeeById(id);
    }
  }

  goBack(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    // Using router navigation to go back to employee list.
    // Since we are lazily loaded, we might need to know the base path.
    // Typically, navigate('../') or absolute path.
    this.router.navigate(['/list-employee']);
  }
}
