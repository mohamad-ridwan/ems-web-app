import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('add')
  async addEmployee(@Body() employeeData: Partial<Employee>) {
    return await this.employeeService.addEmployee(employeeData);
  }

  @Get('list')
  async getEmployees() {
    return await this.employeeService.findAll();
  }

  @Get(':email')
  async getEmployeeByEmail(@Param('email') email: string) {
    return await this.employeeService.findByEmail(email);
  }
}
