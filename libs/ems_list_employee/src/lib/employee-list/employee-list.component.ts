import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeListFacade } from './facade/employee-list.facade';
import { EmployeeTableComponent } from '../ui/employee-table.component';
import { Employee } from '../domain/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '@org/shared-theme';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeTableComponent],
  providers: [EmployeeListFacade],
  templateUrl: './employee-list.view.html'
})
export class EmployeeListComponent {
  facade = inject(EmployeeListFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  groups = [
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

  onPageClick(p: number | string) {
    if (typeof p === 'number') {
      this.facade.setPage(p);
    }
  }

  isPageActive(p: number | string): boolean {
    return this.facade.currentPage() === p;
  }

  onDetail(emp: Employee) {
    const queryParams = this.route.snapshot.queryParams;
    this.router.navigate(['/detail-employee', emp.id], {
      state: {
        fromList: true,
        queryParams: queryParams
      }
    });
  }

  onEdit(emp: Employee) {
    this.notificationService.show(
      'edit',
      `Editing employee: ${emp.firstName} ${emp.lastName} (${emp.username})`
    );
  }

  onDelete(emp: Employee) {
    this.notificationService.show(
      'delete',
      `Deleting employee: ${emp.firstName} ${emp.lastName} (${emp.username})`
    );
  }

  goToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }
}
