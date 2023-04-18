import {Client} from "pg";
import {bcryptClient} from "../../auth/bcrypt.client";
import {Service} from "../utils/service/service";
import {EmployeeRepository} from "./employee.repository";
import {CreateEmployeeFields, Employee} from "./employee.typedefs";
import {Throwable} from "../../api.typedefs";
import {EmployeeError} from "./employee.constants";
import {Op} from "../../misc/op";

export class EmployeeService extends Service {
  private readonly encoder = bcryptClient;
  private employeeRepository: EmployeeRepository;

  constructor(client: Client) {
    super(client);

    this.employeeRepository = new EmployeeRepository(client);
  }

  protected async validateLogInSucceeded(
    email: string,
    attemptPassword: string,
  ): Promise<Throwable<void>> {
    try {
      const {
        password: validPasswordHash,
      } = await this.employeeRepository.findOneByFilters({
        op: Op.And,
        filters: {
          email,
        },
      });

      await this.validateAttemptPassword(attemptPassword, validPasswordHash);
    } catch (error) {
      // TODO: make sure client does not know exact cause
    }
  }

  protected async validateAttemptPassword(
    attemptPassword: string,
    validPasswordHash: string,
  ): Promise<Throwable<void>> {
    const isValidPassword = await this.encoder.comparePasswords(
      attemptPassword,
      validPasswordHash
    );

    if (!isValidPassword) {
      this.throwError({
        message: EmployeeError.CannotLogin,
      });
    }
  }

  protected async validateSignUpPossible(email: string): Promise<Throwable<void>> {
    const isEmailRegistered = await this.isEmailRegistered(email);

    if (isEmailRegistered) {
      this.throwError({
        message: EmployeeError.EmailIsRegistered,
        fields: {
          email,
        },
      });
    }
  }

  protected async validateLogInPossible(email: string): Promise<Throwable<void>> {
    const isEmailRegistered = await this.isEmailRegistered(email);

    if (!isEmailRegistered) {
      this.throwError({
        message: EmployeeError.EmailIsNotRegistered,
        fields: {
          email,
        },
      });
    }
  }

  protected async isEmailRegistered(email: string): Promise<boolean> {
    const employee = await this.employeeRepository.findByEmail(email);

    return Boolean(employee);
  }

  protected async createWithEncodedPassword(
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
}
