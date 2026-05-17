import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailUiComponent } from '../ui/employee-detail-ui.component';
import { EmployeeDetailFacade } from './facade/employee-detail.facade';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, EmployeeDetailUiComponent],
  providers: [EmployeeDetailFacade],
  templateUrl: './employee-detail.view.html'
})
export class EmployeeDetailComponent implements OnInit {
  public facade = inject(EmployeeDetailFacade);

  ngOnInit(): void {
    this.facade.init();
  }
}
