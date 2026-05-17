import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ems-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.view.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label = '';
  @Input() variant = 'primary'; // e.g. primary, secondary, outline-secondary, outline-danger
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() loadingText = 'Saving...';
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
