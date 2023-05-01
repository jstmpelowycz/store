import {CreateEmployeeFields, Employee, UpdateEmployeeFields} from "./employee.typedefs";
import {EmployeeError} from "./employee.constants";
import {buildUpdateQuerySetPart, formatQueryValues} from "../../misc/helpers";
import {pool} from "../../index";
import {Throwable} from "../../api.typedefs";

export class EmployeeRepository {
  public async create(fields: CreateEmployeeFields): Promise<Employee> {
    const {rows} = await pool.query({
      text: `
          INSERT INTO employees (email, password, last_name, first_name, patronymic,
                                 role, salary, birth_date, employment_date,
                                 phone_number, city, street, zip_code)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `,
      values: Object.values(fields),
    });

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
    const {rows} = await pool.query({
      text: `
          UPDATE employees
          SET ${buildUpdateQuerySetPart(fields)}
          WHERE id = ${id};
      `,
      values: [id, ...formatQueryValues(fields)]
    });

    return rows[0];
  }

  public async destroyById(id: number): Promise<boolean> {
    const {rows} = await pool.query({
      text: `
          DELETE
          FROM employees
          WHERE id = $1;
      `,
      values: [id]
    });

    return rows.length !== 0;
  }

  public async findByEmail(email: string): Promise<Employee> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM employees
          WHERE email = $1;
      `,
      values: [email]
    });

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
