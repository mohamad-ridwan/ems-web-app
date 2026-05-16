import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const employee = await this.employeeRepository.findOne({ where: { username } });
    if (employee && employee.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = employee;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      employee: user,
    };
  }
}
