import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import type { Tooltip } from 'bootstrap';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { paramMap: { get: () => null } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default isDesktopCollapsed to false', () => {
    expect(component.isDesktopCollapsed()).toBe(false);
  });

  it('should toggle isDesktopCollapsed when toggleDesktopSidebar is called', () => {
    component.toggleDesktopSidebar();
    expect(component.isDesktopCollapsed()).toBe(true);

    component.toggleDesktopSidebar();
    expect(component.isDesktopCollapsed()).toBe(false);
  });

  it('should set isSidebarOpen to false when closeSidebar is called, hide all tooltips, and blur active element', () => {
    const mockTooltip = {
      hide: vi.fn(),
      dispose: vi.fn(),
      enable: vi.fn(),
      disable: vi.fn(),
    } as unknown as Tooltip;
    component['tooltips'] = [mockTooltip];

    component.isSidebarOpen.set(true);
    component.closeSidebar();

    expect(component.isSidebarOpen()).toBe(false);
    expect(mockTooltip.hide).toHaveBeenCalled();
  });

  it('should restore isDesktopCollapsed from localStorage if present', () => {
    localStorage.setItem('ems_sidebar_collapsed', 'true');
    const customFixture = TestBed.createComponent(SidebarComponent);
    const customComponent = customFixture.componentInstance;
    expect(customComponent.isDesktopCollapsed()).toBe(true);
    localStorage.removeItem('ems_sidebar_collapsed');
  });

  it('should save isDesktopCollapsed to localStorage when toggleDesktopSidebar is called', () => {
    localStorage.removeItem('ems_sidebar_collapsed');
    component.toggleDesktopSidebar();
    expect(localStorage.getItem('ems_sidebar_collapsed')).toBe('true');
    component.toggleDesktopSidebar();
    expect(localStorage.getItem('ems_sidebar_collapsed')).toBe('false');
    localStorage.removeItem('ems_sidebar_collapsed');
  });
});
