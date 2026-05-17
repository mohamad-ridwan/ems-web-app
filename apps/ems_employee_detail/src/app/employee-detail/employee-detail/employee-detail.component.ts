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
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#" (click)="goBack($event)" class="text-decoration-none">Employees</a></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>

          <app-employee-detail-ui 
            [employee]="employee$ | async"
            (onBack)="goBack()">
          </app-employee-detail-ui>

          <div *ngIf="!(employee$ | async)" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Fetching employee data...</p>
          </div>
        </div>
      </div>
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
      this.employee$ = this.employeeService.getEmployeeByEmail(id);
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
