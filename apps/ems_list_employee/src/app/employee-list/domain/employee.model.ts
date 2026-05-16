export interface Employee {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  birthDate: string | Date;
  basicSalary: number;
  status: string;
  group: string;
  description?: string | Date;
}
