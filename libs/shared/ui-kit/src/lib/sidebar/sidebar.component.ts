import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ems-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.view.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() pageTitle = 'Portal';
  @Input() user: { username: string; group: string; } | null = null;
  @Output() logout = new EventEmitter<void>();

  isSidebarOpen = signal(false);
  isDropdownOpen = signal(false);

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  onLogout() {
    this.logout.emit();
  }
}
