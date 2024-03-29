import {bcryptClient} from "../../../auth/bcrypt.client";
import {EmployeeRepository} from "./employee.repository";
import {CreateEmployeeFields, Employee, EmployeesPhoneNumberAndAddress} from "./employee.typedefs";
import {Throwable} from "../../../typings/api.typedefs";
import {EmployeeError} from "./employee.constants";
import {pool} from "../../index";

export class EmployeeService {
  private readonly encoder = bcryptClient;
  private employeeRepository = new EmployeeRepository();

  public async validateLogInSucceededAndReturnEmployee(
    email: string,
    attemptPassword: string,
  ): Promise<Throwable<Employee>> {
    const employee = await this.employeeRepository.getByEmail(email);
    const validPasswordHash = employee.password;

    await this.validateAttemptPassword(attemptPassword, validPasswordHash);

    return employee;
  }

  private async validateAttemptPassword(
    attemptPassword: string,
    validPasswordHash: string,
  ): Promise<Throwable<void>> {
    const isValidPassword = await this.encoder.comparePasswords(
      attemptPassword,
      validPasswordHash
    );

    if (!isValidPassword) {
      throw new Error(EmployeeError.CannotLogin);
    }
  }

  public async validateSignUpPossible(email: string): Promise<Throwable<void>> {
    const isEmailRegistered = await this.isEmailRegistered(email);

    if (isEmailRegistered) {
      throw new Error(EmployeeError.EmailIsRegistered);
    }
  }

  public async validateLogInPossible(email: string): Promise<Throwable<void>> {
    const isEmailRegistered = await this.isEmailRegistered(email);

    if (!isEmailRegistered) {
      throw new Error(EmployeeError.EmailIsNotRegistered);
    }
  }

  public async isEmailRegistered(email: string): Promise<boolean> {
    const employee = await this.employeeRepository.findByEmail(email);

    return Boolean(employee);
  }

  public async createWithEncodedPassword(
    fields: CreateEmployeeFields,
  ): Promise<Employee> {
    const fieldsWithEncodedPassword = await this.withPasswordEncoded(fields);

    return this.employeeRepository.create(fieldsWithEncodedPassword);
  }

  private async withPasswordEncoded(
    fields: CreateEmployeeFields,
  ): Promise<CreateEmployeeFields> {
    const {password, ...rest} = fields;

    const encodedPassword = await this.encoder.encode(password);

    return {
      password: encodedPassword,
      ...rest,
    };
  }

  public async getEmployeesPhoneNumberAndAddressByLastName(
    last_name: string,
  ): Promise<EmployeesPhoneNumberAndAddress> {
    const {rows} = await pool.query({
      text: `
          SELECT phone_number, city, street, zip_code
          FROM employees
          WHERE last_name = $1;
      `,
      values: [last_name]
    });

    return rows[0];
  }
}
