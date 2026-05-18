import { Component } from '@angular/core';
import { SidebarLayoutComponent } from '@org/layout';

@Component({
  selector: 'app-ems-list-employee-root',
  standalone: true,
  imports: [SidebarLayoutComponent],
  templateUrl: './app.view.html',
  styleUrl: './app.view.scss',
})
export class EmsListEmployeeRootComponent {}
