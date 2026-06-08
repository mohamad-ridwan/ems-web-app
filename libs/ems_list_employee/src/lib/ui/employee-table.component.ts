import { Component, Input, Output, EventEmitter, ElementRef, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Employee } from '../domain/employee.model';
import type { Tooltip } from 'bootstrap';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.view.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnDestroy {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private tooltips: Tooltip[] = [];
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  private _employees: Employee[] = [];

  @Input()
  set employees(value: Employee[]) {
    this._employees = value;
    this.recreateTooltips();
  }
  get employees(): Employee[] {
    return this._employees;
  }

  @Output() sort = new EventEmitter<keyof Employee>();
  @Output() detail = new EventEmitter<Employee>();
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();

  private async recreateTooltips() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.clearTooltips();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(async () => {
      try {
        const { Tooltip } = await import('bootstrap');
        const tooltipElements = this.elementRef.nativeElement.querySelectorAll(
          '[data-bs-toggle="tooltip"]'
        );
        this.tooltips = Array.from(tooltipElements).map(
          (el) => new Tooltip(el as HTMLElement)
        );
      } catch (err) {
        console.error('Failed to initialize tooltips:', err);
      }
    }, 0);
  }

  private clearTooltips() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.tooltips.forEach((tooltip) => {
      try {
        tooltip.dispose();
      } catch {
        // ignore
      }
    });
    this.tooltips = [];
  }

  ngOnDestroy() {
    this.clearTooltips();
  }
}
