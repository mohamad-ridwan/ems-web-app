import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../data-access/employee.service';
import { Employee } from '../../domain/employee.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class EmployeeDetailFacade {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);

  employee$: Observable<Employee> = of();

  init(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee$ = this.employeeService.getEmployeeById(id);
    }
  }

  goBack(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    // 1. Check if the previous route was list-employee and passed queryParams in state
    const state = window.history.state;
    if (state && state.fromList && state.queryParams) {
      this.router.navigate(['/list-employee'], { queryParams: state.queryParams });
      return;
    }

    // 2. Fallback: check sessionStorage for last active employee list searchParams
    const savedParamsStr = sessionStorage.getItem('ems_employee_list_params');
    if (savedParamsStr) {
      try {
        const savedParams = JSON.parse(savedParamsStr);
        if (savedParams && Object.keys(savedParams).length > 0) {
          this.router.navigate(['/list-employee'], { queryParams: savedParams });
          return;
        }
      } catch (e) {
        console.error('Failed to parse saved employee list params', e);
      }
    }

    // 3. Navigate with default parameters (empty queryParams)
    this.router.navigate(['/list-employee']);
  }
}
