import { Injectable, inject, signal, computed } from '@angular/core';
import { EmployeeDataAccessService } from '../data-access/employee.service';
import { Employee } from '../domain/employee.model';

@Injectable()
export class EmployeeListViewModel {
  private dataService = inject(EmployeeDataAccessService);

  // Search Params
  searchFirstName = signal<string>('');
  searchLastName = signal<string>('');

  // Paging
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);

  // Sorting
  sortColumn = signal<keyof Employee | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Filtered and Sorted Data
  private filteredData = computed(() => {
    const data = this.dataService.employees();
    const fName = this.searchFirstName().toLowerCase();
    const lName = this.searchLastName().toLowerCase();

    return data.filter(emp => 
      emp.firstName.toLowerCase().includes(fName) && 
      emp.lastName.toLowerCase().includes(lName)
    );
  });

  private sortedData = computed(() => {
    const data = [...this.filteredData()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!column) return data;

    return data.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA === undefined || valB === undefined) return 0;
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // Paged Data
  pagedEmployees = computed(() => {
    const data = this.sortedData();
    const start = (this.currentPage() - 1) * this.pageSize();
    return data.slice(start, start + this.pageSize());
  });

  totalItems = computed(() => this.sortedData().length);
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  loading = this.dataService.loading;

  constructor() {
    this.dataService.loadEmployees();
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
  }
}
