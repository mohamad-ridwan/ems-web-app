import { Controller, Post, Body, Get, Param, Inject, Query } from '@nestjs/common';
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
  async getEmployees(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('status') status?: string,
    @Query('group') group?: string,
    @Query('email') email?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC'
  ) {
    return await this.employeeService.findAll({
      page,
      limit,
      firstName,
      lastName,
      status,
      group,
      email,
      sortBy,
      sortOrder,
    });
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string) {
    return await this.employeeService.findById(Number(id));
  }
}

