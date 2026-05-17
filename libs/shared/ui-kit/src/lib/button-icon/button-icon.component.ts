import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ems-button-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-icon.view.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label = '';
  @Input() icon = ''; // e.g. "bi bi-x-circle" or "bi bi-save"
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() variant = 'primary';
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() loadingText = 'Loading...';
  @Input() styleClass = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled && !this.isLoading) {
      this.clicked.emit(event);
    } else {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}
