import { Component } from '@angular/core';
import { SidebarLayoutComponent } from '@org/layout';

@Component({
  imports: [SidebarLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'ems-dashboard';
}
