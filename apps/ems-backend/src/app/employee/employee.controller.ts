import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(@Inject(EmployeeService) private readonly employeeService: EmployeeService) {}

  @Post('add')
  async addEmployee(@Body() employeeData: Partial<Employee>) {
    return await this.employeeService.addEmployee(employeeData);
  }

  @Get('list')
  async getEmployees() {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    return await this.employeeService.findById(Number(id));
  }
}
