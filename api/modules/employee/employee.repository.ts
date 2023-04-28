import {CreateEmployeeFields, Employee, UpdateEmployeeFields} from "./employee.typedefs";
import {EmployeeError} from "./employee.constants";
import {mapFieldsWithSqlValueWrapper} from "../../misc/helpers";
import {pool} from "../../index";
import {Throwable} from "../../api.typedefs";

export class EmployeeRepository {
  public async create(fields: CreateEmployeeFields): Promise<Employee> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {
      first_name,
      last_name,
      patronymic,
      role,
      salary,
      phone_number,
      city,
      street,
      zip_code,
      email,
      password,
      birth_date,
      employment_date,
    } = processedFields;

    const {rows} = await pool.query(`
        INSERT INTO employees (email, password, last_name, first_name, patronymic,
                               role, salary, birth_date, employment_date,
                               phone_number, city, street, zip_code)
        VALUES (${email},
                ${password},
                ${last_name},
                ${first_name},
                ${patronymic},
                ${role},
                ${salary},
                ${birth_date},
                ${employment_date},
                ${phone_number},
                ${city},
                ${street},
                ${zip_code})
    `);

    return rows[0];
  }

  public async findAll(): Promise<Employee[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM employees
        ORDER BY last_name;
    `);

    return rows;
  }

  public async updateById(
    id: number,
    fields: UpdateEmployeeFields,
  ): Promise<Employee> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {
      first_name,
      last_name,
      patronymic,
      role,
      salary,
      phone_number,
      city,
      street,
      zip_code,
    } = processedFields;

    const {rows} = await pool.query(`
        UPDATE employees
        SET last_name    = '${last_name}',
            first_name   = '${first_name}',
            patronymic   = '${patronymic}',
            role         = '${role}',
            salary       = ${salary},
            phone_number = '${phone_number}',
            city         = '${city}',
            street       = '${street}',
            zip_code     = '${zip_code}'
        WHERE id = ${id};
    `);

    return rows[0];
  }

  public async destroyById(id: number): Promise<boolean> {
    const {rows} = await pool.query(`
        DELETE
        FROM employees
        WHERE id = ${id};
    `);

    return rows.length !== 0;
  }

  public async findByEmail(email: string): Promise<Employee> {
    const {rows} = await pool.query(`
        SELECT *
        FROM employees
        WHERE email = ${email};
    `);

    return rows[0];
  }

  public async getByEmail(email: string): Promise<Throwable<Employee>> {
    const employee = await this.findByEmail(email);

    if (!employee) {
      throw new Error(EmployeeError.NotFound);
    }

    return employee;
  }
}
