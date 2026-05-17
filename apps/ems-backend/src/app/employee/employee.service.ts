import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async addEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return await this.employeeRepository.save(employee);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    firstName?: string;
    lastName?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  } = {}): Promise<{ data: Employee[]; total: number }> {
    const count = await this.employeeRepository.count();
    if (count < 100) {
      await this.seedEmployees();
    }

    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

    if (query.firstName) {
      queryBuilder.andWhere('LOWER(employee.firstName) LIKE LOWER(:firstName)', {
        firstName: `%${query.firstName}%`,
      });
    }

    if (query.lastName) {
      queryBuilder.andWhere('LOWER(employee.lastName) LIKE LOWER(:lastName)', {
        lastName: `%${query.lastName}%`,
      });
    }

    if (query.sortBy) {
      const validColumns = [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'birthDate',
        'basicSalary',
        'status',
        'group',
        'description',
      ];
      if (validColumns.includes(query.sortBy)) {
        const order = query.sortOrder === 'DESC' ? 'DESC' : 'ASC';
        queryBuilder.orderBy(`employee.${query.sortBy}`, order);
      }
    } else {
      queryBuilder.orderBy('employee.id', 'ASC');
    }

    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }

  async findById(id: number): Promise<Employee> {
    return await this.employeeRepository.findOne({ where: { id } });
  }

  private async seedEmployees() {
    const groups = ['IT', 'HR', 'Finance', 'Operations', 'Sales'];
    const statuses = ['Active', 'Resigned', 'On Leave'];
    
    for (let i = 1; i <= 100; i++) {
      const employee = this.employeeRepository.create({
        username: `user${i}`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        password: `password${i}`,
        email: `user${i}@example.com`,
        birthDate: new Date(1990, 0, i % 28 + 1),
        basicSalary: 5000000 + (i * 100000),
        status: statuses[i % statuses.length],
        group: groups[i % groups.length],
        description: new Date()
      });
      await this.employeeRepository.save(employee);
    }
  }
}
