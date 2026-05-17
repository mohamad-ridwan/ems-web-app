import { Injectable, signal } from '@angular/core';
import { NotificationType } from './notification.component';


export interface NotificationState {
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSignal = signal<NotificationState | null>(null);

  // Read-only signal exposed to components
  notification = this.notificationSignal.asReadonly();

  showNotification(type: NotificationType, title: string, message: string, duration = 4000) {
    this.notificationSignal.set({ type, title, message, duration });
  }

  show(type: NotificationType, message: string, title?: string, duration = 4000) {
    this.notificationSignal.set({ type, title, message, duration });
  }

  clearNotification() {
    this.notificationSignal.set(null);
  }
}
