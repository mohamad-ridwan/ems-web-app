import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../domain/employee.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataAccessService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3400/api/employee/list';

  // State
  private employeesState = signal<Employee[]>([]);
  private loadingState = signal<boolean>(false);
  private errorState = signal<string | null>(null);

  // Selectors
  employees = computed(() => this.employeesState());
  loading = computed(() => this.loadingState());
  error = computed(() => this.errorState());

  loadEmployees() {
    this.loadingState.set(true);
    this.http.get<Employee[]>(this.apiUrl).pipe(
      tap({
        next: (employees) => {
          this.employeesState.set(employees);
          this.loadingState.set(false);
        },
        error: (err) => {
          this.errorState.set('Failed to load employees');
          this.loadingState.set(false);
          console.error(err);
        }
      })
    ).subscribe();
  }
}
