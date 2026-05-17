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

  async getProfileByToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: 'secretKey' });
      if (!payload || !payload.sub) {
        return null;
      }
      const id = Number(payload.sub);
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (employee) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = employee;
        return result;
      }
    } catch (e) {
      return null;
    }
    return null;
  }
}
