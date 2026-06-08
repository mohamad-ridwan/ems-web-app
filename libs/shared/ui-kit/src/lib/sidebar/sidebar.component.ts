import { Component, Input, Output, EventEmitter, signal, AfterViewInit, OnDestroy, ElementRef, inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { Tooltip } from 'bootstrap';

@Component({
  selector: 'ems-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.view.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @Input() pageTitle = 'Portal';
  @Input() user: { username: string; group: string; } | null = null;
  @Input() isLoginPage = false;
  @Output() logout = new EventEmitter<void>();

  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);
  private tooltips: Tooltip[] = [];

  isSidebarOpen = signal(false);
  isDropdownOpen = signal(false);
  isDesktopCollapsed = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const cached = localStorage.getItem('ems_sidebar_collapsed');
      if (cached !== null) {
        this.isDesktopCollapsed.set(cached === 'true');
      }
    }
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  toggleDesktopSidebar() {
    this.isDesktopCollapsed.update(val => {
      const newVal = !val;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('ems_sidebar_collapsed', String(newVal));
      }
      return newVal;
    });
    this.updateTooltipsState();
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  onLogout() {
    this.logout.emit();
  }

  private isDesktopView(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth >= 992;
    }
    return true;
  }

  private updateTooltipsState() {
    const shouldShowTooltips = this.isDesktopCollapsed() && this.isDesktopView();
    this.tooltips.forEach(tooltip => {
      if (shouldShowTooltips) {
        tooltip.enable();
      } else {
        tooltip.disable();
        try {
          tooltip.hide();
        } catch {
          // ignore
        }
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.updateTooltipsState();
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { Tooltip } = await import('bootstrap');
      const tooltipElements = this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
      this.tooltips = Array.from(tooltipElements).map((el) => new Tooltip(el as HTMLElement));
      this.updateTooltipsState();
    }
  }

  ngOnDestroy() {
    this.tooltips.forEach(tooltip => {
      try {
        tooltip.dispose();
      } catch {
        // ignore errors during destruction
      }
    });
  }
}
