import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeAddFacade } from './facade/employee-add.facade';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [EmployeeAddFacade],
  templateUrl: './employee-add.view.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent {
  public facade = inject(EmployeeAddFacade);
}
