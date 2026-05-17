import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailFacade } from './facade/employee-detail.facade';
import { ButtonComponent, ButtonIconComponent } from '@org/ui-kit';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ButtonIconComponent],
  providers: [EmployeeDetailFacade],
  templateUrl: './employee-detail.view.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  public facade = inject(EmployeeDetailFacade);

  ngOnInit(): void {
    this.facade.init();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace('IDR', 'Rp.');
  }
}
