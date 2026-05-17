import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PopupNotificationType = 'success' | 'warning' | 'danger' | 'info' | 'edit' | 'delete';

@Component({
  selector: 'ems-popup-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-notification.view.html',
  styleUrl: './popup-notification.view.scss'
})
export class PopupNotificationComponent implements OnInit, OnDestroy {
  @Input() type: PopupNotificationType = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() duration = 4000; // default 4 seconds

  @Output() close = new EventEmitter<void>();

  isHiding = false;
  private dismissTimeout: any;

  ngOnInit() {
    if (this.duration > 0) {
      this.dismissTimeout = setTimeout(() => {
        this.dismiss();
      }, this.duration);
    }
  }

  ngOnDestroy() {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
    }
  }

  dismiss() {
    if (this.isHiding) return;
    this.isHiding = true;
    setTimeout(() => {
      this.close.emit();
    }, 350); // Match slideOut animation duration
  }

  getIconClass(): string {
    switch (this.type) {
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'edit':
      case 'warning':
        return 'bi bi-pencil-square';
      case 'delete':
      case 'danger':
        return 'bi bi-trash-fill';
      case 'info':
      default:
        return 'bi bi-info-circle-fill';
    }
  }

  getDefaultTitle(): string {
    switch (this.type) {
      case 'success':
        return 'Success';
      case 'edit':
        return 'Edit Employee';
      case 'delete':
        return 'Delete Employee';
      case 'warning':
        return 'Warning';
      case 'danger':
        return 'Error';
      case 'info':
      default:
        return 'Information';
    }
  }

  getThemeColor(): string {
    switch (this.type) {
      case 'success':
        return '#10b981';
      case 'edit':
      case 'warning':
        return '#f59e0b';
      case 'delete':
      case 'danger':
        return '#ef4444';
      case 'info':
      default:
        return '#0ea5e9';
    }
  }
}
