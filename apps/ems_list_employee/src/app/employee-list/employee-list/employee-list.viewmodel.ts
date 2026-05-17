import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDataAccessService } from '../data-access/employee.service';
import { Employee } from '../domain/employee.model';

@Injectable()
export class EmployeeListViewModel {
  private dataService = inject(EmployeeDataAccessService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Search Params
  searchFirstName = signal<string>('');
  searchLastName = signal<string>('');
  searchStatus = signal<string>('');
  searchGroup = signal<string>('');

  // Paging
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);

  // Sorting
  sortColumn = signal<keyof Employee | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Paged Data is retrieved directly from the paginated backend model (via data service)
  pagedEmployees = this.dataService.employees;
  totalItems = this.dataService.totalItems;
  loading = this.dataService.loading;

  totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    return Math.ceil(total / size);
  });

  // Calculate visible pages (showing first/last pages & 5 page window in middle with ellipsis if far)
  visiblePages = computed<(number | string)[]>(() => {
    const current = this.currentPage();
    const total = this.totalPages();

    if (total <= 9) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 5) {
      return [...Array.from({ length: 7 }, (_, i) => i + 1), '...', total];
    }

    if (current >= total - 4) {
      return [1, '...', ...Array.from({ length: 7 }, (_, i) => total - 6 + i)];
    }

    return [1, '...', current - 2, current - 1, current, current + 1, current + 2, '...', total];
  });

  constructor() {
    // 1. Initialize states from query params in route snapshot on load
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['firstName']) this.searchFirstName.set(queryParams['firstName']);
    if (queryParams['lastName']) this.searchLastName.set(queryParams['lastName']);
    if (queryParams['status']) this.searchStatus.set(queryParams['status']);
    if (queryParams['group']) this.searchGroup.set(queryParams['group']);
    if (queryParams['page']) this.currentPage.set(Number(queryParams['page']));
    if (queryParams['limit']) this.pageSize.set(Number(queryParams['limit']));
    if (queryParams['sortBy']) this.sortColumn.set(queryParams['sortBy'] as keyof Employee);
    if (queryParams['sortOrder']) this.sortDirection.set(queryParams['sortOrder'] as 'asc' | 'desc');

    // 2. Setup reactive effect to trigger backend search and sync to URL searchParams
    effect(() => {
      const page = this.currentPage();
      const limit = this.pageSize();
      const firstName = this.searchFirstName();
      const lastName = this.searchLastName();
      const status = this.searchStatus();
      const group = this.searchGroup();
      const sortBy = this.sortColumn();
      const sortDirection = this.sortDirection();

      const queryParams = {
        page: page !== 1 ? page : null,
        limit: limit !== 10 ? limit : null,
        firstName: firstName || null,
        lastName: lastName || null,
        status: status || null,
        group: group || null,
        sortBy: sortBy || null,
        sortOrder: sortBy ? sortDirection : null,
      };

      // Store in sessionStorage for global persistence across navigation
      sessionStorage.setItem('ems_employee_list_params', JSON.stringify(queryParams));

      // Sync state to URL Query Params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
        replaceUrl: true
      });

      // Load employees from Backend
      this.dataService.loadEmployees({
        page,
        limit,
        firstName,
        lastName,
        status,
        group,
        sortBy: sortBy || undefined,
        sortOrder: sortBy ? (sortDirection.toUpperCase() as 'ASC' | 'DESC') : undefined
      });
    });
  }

  updateFirstName(name: string) {
    this.searchFirstName.set(name);
    this.currentPage.set(1);
  }

  updateLastName(name: string) {
    this.searchLastName.set(name);
    this.currentPage.set(1);
  }

  updateStatus(status: string) {
    this.searchStatus.set(status);
    this.currentPage.set(1);
  }

  updateGroup(group: string) {
    this.searchGroup.set(group);
    this.currentPage.set(1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  setPageSize(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  toggleSort(column: keyof Employee) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
    this.currentPage.set(1); // Reset page on sort
  }
}
