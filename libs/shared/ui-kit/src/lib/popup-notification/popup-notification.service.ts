import { Injectable, signal } from '@angular/core';
import { PopupNotificationType } from './popup-notification.component';

export interface PopupNotificationState {
  type: PopupNotificationType;
  title?: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PopupNotificationService {
  private notificationSignal = signal<PopupNotificationState | null>(null);

  // Read-only signal exposed to components
  notification = this.notificationSignal.asReadonly();

  showNotification(type: PopupNotificationType, title: string, message: string, duration = 4000) {
    this.notificationSignal.set({ type, title, message, duration });
  }

  show(type: PopupNotificationType, message: string, title?: string, duration = 4000) {
    this.notificationSignal.set({ type, title, message, duration });
  }

  clearNotification() {
    this.notificationSignal.set(null);
  }
}
