import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { generateUuid, encrypt } from '../utils/crypto.util';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async addEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    const userUuid = generateUuid();
    const rawPassword = employeeData.password || '';
    const encryptedPassword = encrypt(rawPassword, userUuid);

    const employee = this.employeeRepository.create({
      ...employeeData,
      password: encryptedPassword,
      uuidKey: userUuid,
    });
    return await this.employeeRepository.save(employee);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    firstName?: string;
    lastName?: string;
    status?: string;
    group?: string;
    email?: string;
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

    if (query.email) {
      queryBuilder.andWhere('LOWER(employee.email) LIKE LOWER(:email)', {
        email: `%${query.email}%`,
      });
    }

    if (query.group) {
      queryBuilder.andWhere('employee.group = :group', {
        group: query.group,
      });
    }

    if (query.status) {
      const statusVal = query.status.toLowerCase();
      if (statusVal === 'active') {
        queryBuilder.andWhere('LOWER(employee.status) = :status', { status: 'active' });
      } else if (statusVal === 'resign' || statusVal === 'resigned') {
        queryBuilder.andWhere('LOWER(employee.status) LIKE :status', { status: 'resign%' });
      } else {
        queryBuilder.andWhere('LOWER(employee.status) = :status', { status: statusVal });
      }
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
    const groups = [
      'Engineering',
      'Human Resources',
      'Marketing',
      'Sales',
      'Finance',
      'Legal',
      'Product',
      'Design',
      'Customer Support',
      'Operations',
    ];
    const statuses = ['Active', 'Resigned', 'On Leave'];
    
    for (let i = 1; i <= 100; i++) {
      const userUuid = generateUuid();
      const rawPassword = `password${i}`;
      const encryptedPassword = encrypt(rawPassword, userUuid);

      const employee = this.employeeRepository.create({
        username: `user${i}`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        password: encryptedPassword,
        uuidKey: userUuid,
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
