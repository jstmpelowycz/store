import {NonIdentifiable} from "../typedefs";

export interface EmployeeBase {
  id: number;
  first_name: string;
  last_name: string;
  patronymic?: string;
  role: EmployeeRole;
  salary: number;
  birth_date: string;
  employment_date: string;
  phone_number: string;
  city: string;
  street: string;
  zip_code: string;
}

export interface Employee extends EmployeeBase {
  email: string;
  password: string;
}

export interface EmployeesPhoneNumberAndAddress {
  phone_number: string;
  city: string;
  street: string;
  zip_code: string;
}

export enum EmployeeRole {
  Manager = 'MANAGER',
  Cashier = 'CASHIER',
}

export type CreateEmployeeFields = NonIdentifiable<Employee>;

export type UpdateEmployeeFields = Omit<NonIdentifiable<Employee>, 'birth_date' | 'employment_date'>;
