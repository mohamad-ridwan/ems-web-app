import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ems-flat-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flat-notification.view.html',
  styleUrl: './flat-notification.component.scss'
})
export class FlatNotificationComponent {
  @Input() type: 'success' | 'warning' | 'danger' | 'info' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = true;
  @Input() styleClass = '';

  @Output() closed = new EventEmitter<void>();

  dismissed = false;

  onClose() {
    this.dismissed = true;
    this.closed.emit();
  }

  getAlertClass(): string {
    switch (this.type) {
      case 'success': return 'alert-success';
      case 'warning': return 'alert-warning';
      case 'danger': return 'alert-danger';
      case 'info':
      default: return 'alert-info';
    }
  }

  getIconClass(): string {
    switch (this.type) {
      case 'success': return 'bi bi-check-circle-fill';
      case 'warning': return 'bi bi-exclamation-triangle-fill';
      case 'danger': return 'bi bi-exclamation-octagon-fill';
      case 'info':
      default: return 'bi bi-info-circle-fill';
    }
  }
}
