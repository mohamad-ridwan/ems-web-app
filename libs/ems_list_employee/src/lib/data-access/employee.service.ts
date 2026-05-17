import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../domain/employee.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataAccessService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3400/api/employee/list';

  // State
  private employeesState = signal<Employee[]>([]);
  private totalItemsState = signal<number>(0);
  private loadingState = signal<boolean>(false);
  private errorState = signal<string | null>(null);

  // Selectors
  employees = computed(() => this.employeesState());
  totalItems = computed(() => this.totalItemsState());
  loading = computed(() => this.loadingState());
  error = computed(() => this.errorState());

  loadEmployees(
    params: {
      page?: number;
      limit?: number;
      firstName?: string;
      lastName?: string;
      status?: string;
      group?: string;
      email?: string;
      sortBy?: string;
      sortOrder?: 'ASC' | 'DESC';
    } = {},
  ) {
    this.loadingState.set(true);

    const queryParams: Record<string, string> = {};
    if (params.page !== undefined) queryParams['page'] = params.page.toString();
    if (params.limit !== undefined)
      queryParams['limit'] = params.limit.toString();
    if (params.firstName) queryParams['firstName'] = params.firstName;
    if (params.lastName) queryParams['lastName'] = params.lastName;
    if (params.status) queryParams['status'] = params.status;
    if (params.group) queryParams['group'] = params.group;
    if (params.email) queryParams['email'] = params.email;
    if (params.sortBy) queryParams['sortBy'] = params.sortBy;
    if (params.sortOrder) queryParams['sortOrder'] = params.sortOrder;

    this.http
      .get<{ data: Employee[]; total: number }>(this.apiUrl, {
        params: queryParams,
      })
      .pipe(
        tap({
          next: (res) => {
            this.employeesState.set(res.data || []);
            this.totalItemsState.set(res.total || 0);
            this.loadingState.set(false);
          },
          error: (err) => {
            this.errorState.set('Failed to load employees');
            this.loadingState.set(false);
            console.error(err);
          },
        }),
      )
      .subscribe();
  }
}
