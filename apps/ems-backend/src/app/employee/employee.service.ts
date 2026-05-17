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

  async findAll(): Promise<Employee[]> {
    const count = await this.employeeRepository.count();
    if (count < 100) {
      await this.seedEmployees();
    }
    return await this.employeeRepository.find();
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
