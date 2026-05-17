import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'success' | 'warning' | 'danger' | 'info' | 'edit' | 'delete';

@Component({
  selector: 'lib-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="notification-toast shadow-lg" 
      [class.hide]="isHiding"
      [class.toast-success]="type === 'success'"
      [class.toast-warning]="type === 'warning' || type === 'edit'"
      [class.toast-danger]="type === 'danger' || type === 'delete'"
      [class.toast-info]="type === 'info'"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <!-- Accent Left Border Line -->
      <div class="accent-bar"></div>

      <!-- Content Area -->
      <div class="toast-content p-3 flex-grow-1">
        <div class="d-flex align-items-center gap-3">
          <!-- Icon -->
          <div class="icon-container d-flex align-items-center justify-content-center">
            <i [ngClass]="getIconClass()"></i>
          </div>

          <!-- Message & Title -->
          <div class="message-container flex-grow-1">
            <h6 class="mb-1 fw-bold text-dark toast-title">
              {{ title || getDefaultTitle() }}
            </h6>
            <p class="mb-0 text-muted small toast-message">
              {{ message }}
            </p>
          </div>

          <!-- Close Button -->
          <button 
            type="button" 
            class="btn-close ms-auto btn-close-custom" 
            aria-label="Close"
            (click)="dismiss()"
          ></button>
        </div>
      </div>

      <!-- Animated Progress Bar for Auto-dismiss -->
      <div class="progress-bar-container" *ngIf="duration > 0">
        <div 
          class="progress-bar-fill" 
          [style.animationDuration]="duration + 'ms'"
          [style.background-color]="getThemeColor()"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 99999;
      pointer-events: none; /* Let clicks pass through except on the toast itself */
    }

    .notification-toast {
      pointer-events: auto; /* Re-enable pointer events on the toast */
      position: relative;
      display: flex;
      min-width: 320px;
      max-width: 420px;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02);
      animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transition: all 0.3s ease;
    }

    .accent-bar {
      width: 6px;
      flex-shrink: 0;
      background-color: var(--accent-color, #0ea5e9);
    }

    /* Type Specific Styles */
    .toast-success {
      --accent-color: #10b981;
      --icon-color: #10b981;
      --icon-bg: rgba(16, 185, 129, 0.12);
    }

    .toast-warning {
      --accent-color: #f59e0b;
      --icon-color: #f59e0b;
      --icon-bg: rgba(245, 158, 11, 0.12);
    }

    .toast-danger {
      --accent-color: #ef4444;
      --icon-color: #ef4444;
      --icon-bg: rgba(239, 68, 68, 0.12);
    }

    .toast-info {
      --accent-color: #0ea5e9;
      --icon-color: #0ea5e9;
      --icon-bg: rgba(14, 165, 233, 0.12);
    }

    /* Icon Container */
    .icon-container {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background-color: var(--icon-bg);
      color: var(--icon-color);
      font-size: 1.15rem;
      flex-shrink: 0;
    }

    /* Close Button Customization */
    .btn-close-custom {
      font-size: 0.75rem;
      padding: 0.5rem;
      opacity: 0.6;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .btn-close-custom:hover {
      opacity: 1;
      transform: scale(1.08);
    }

    /* Message & Title Styles */
    .toast-title {
      font-size: 0.95rem;
      letter-spacing: -0.01em;
    }

    .toast-message {
      font-size: 0.85rem;
      line-height: 1.4;
    }

    /* Animated Progress Bar */
    .progress-bar-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      width: 100%;
      transform-origin: left;
      animation: shrink linear forwards;
    }

    /* Animations */
    @keyframes slideIn {
      from {
        transform: translateX(120%) scale(0.9);
        opacity: 0;
      }
      to {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
    }

    .notification-toast.hide {
      animation: slideOut 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes slideOut {
      from {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
      to {
        transform: translateX(120%) scale(0.9);
        opacity: 0;
      }
    }

    @keyframes shrink {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() type: NotificationType = 'info';
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
