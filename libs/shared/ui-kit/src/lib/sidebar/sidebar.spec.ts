import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

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

  it('should set isSidebarOpen to false when closeSidebar is called', () => {
    component.isSidebarOpen.set(true);
    component.closeSidebar();
    expect(component.isSidebarOpen()).toBe(false);
  });
});
