import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../domain/employee.model';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.view.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Output() sort = new EventEmitter<keyof Employee>();
  @Output() detail = new EventEmitter<Employee>();
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();
}
