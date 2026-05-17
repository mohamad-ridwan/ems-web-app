import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'ems-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.view.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() control: any = null; // Can be FormControl or AbstractControl
  @Input() errorMessage = '';
  @Input() disabled = false;
  @Input() maxDate = '';
  @Input() readOnly = false;
  @Input() styleClass = '';
  @Input() prependText = ''; // e.g. "Rp" for currency
  
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
