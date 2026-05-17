import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  uuidKey: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  basicSalary: number;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 50 })
  group: string;

  @Column({ type: 'timestamp', nullable: true })
  description: Date;
}
