import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { decrypt } from '../utils/crypto.util';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private jwtService: JwtService,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });
    if (employee) {
      if (!employee.uuidKey) {
        // Fallback for legacy passwords
        if (employee.password === pass) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, uuidKey, ...result } = employee;
          return result;
        }
      } else {
        try {
          const decryptedPassword = decrypt(
            employee.password,
            employee.uuidKey,
          );
          if (decryptedPassword === pass) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, uuidKey, ...result } = employee;
            return result;
          }
        } catch (e) {
          console.error('Password decryption failed during login:', e);
        }
      }
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
        const { password, uuidKey, ...result } = employee;
        return result;
      }
    } catch (e) {
      return null;
    }
    return null;
  }
}
