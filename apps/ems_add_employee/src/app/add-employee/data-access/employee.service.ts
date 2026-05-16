import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../domain/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3400/api/employee';
  private http = inject(HttpClient);

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
  }

  getGroups(): string[] {
    return [
      'Engineering',
      'Human Resources',
      'Marketing',
      'Sales',
      'Finance',
      'Legal',
      'Product',
      'Design',
      'Customer Support',
      'Operations',
    ];
  }
}
