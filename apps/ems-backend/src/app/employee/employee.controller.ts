import { Controller, Post, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('add')
  async addEmployee(@Body() employeeData: Partial<Employee>) {
    return await this.employeeService.addEmployee(employeeData);
  }
}
