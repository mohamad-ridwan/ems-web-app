import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { EmployeeService } from './app/employee/employee.service';

async function run() {
  console.log('🚀 Bootstrapping NestJS standalone application...');
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('✅ NestJS context initialized.');

  const employeeService = app.get(EmployeeService);
  console.log('🌱 Seeding employees into the database...');
  
  // Directly trigger the seedEmployees method
  await (employeeService as any).seedEmployees();
  
  console.log('🎉 Employee seeding completed successfully!');
  await app.close();
}

// run().catch((error) => {
//   console.error('❌ Error seeding database:', error);
//   process.exit(1);
// });
