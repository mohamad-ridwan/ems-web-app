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

  // Calculate visible pages (max 5 buttons, responsive to active page)
  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const maxButtons = 5;

    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(maxButtons / 2);
    let end = current + Math.floor(maxButtons / 2);

    if (start < 1) {
      start = 1;
      end = maxButtons;
    } else if (end > total) {
      end = total;
      start = total - maxButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  constructor() {
    // 1. Initialize states from query params in route snapshot on load
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['firstName']) this.searchFirstName.set(queryParams['firstName']);
    if (queryParams['lastName']) this.searchLastName.set(queryParams['lastName']);
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
      const sortBy = this.sortColumn();
      const sortDirection = this.sortDirection();

      // Sync state to URL Query Params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: page !== 1 ? page : null,
          limit: limit !== 10 ? limit : null,
          firstName: firstName || null,
          lastName: lastName || null,
          sortBy: sortBy || null,
          sortOrder: sortBy ? sortDirection : null,
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });

      // Load employees from Backend
      this.dataService.loadEmployees({
        page,
        limit,
        firstName,
        lastName,
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
