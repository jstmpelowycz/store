export interface Employee {
  id: number;
  email: string;
  password: string;
}

export type CreateEmployeeFields = Pick<Employee, 'email' | 'password'>;
