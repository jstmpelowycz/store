import {CreateEmployeeFields, Employee, UpdateEmployeeFields} from "./employee.typedefs";
import {EmployeeError} from "./employee.constants";
import {buildInsertQueryLeftValues, buildUpdateQuerySetPart, formatQueryValues} from "../../../misc/helpers";
import {pool} from "../../index";
import {Throwable} from "../../../typings/api.typedefs";

export class EmployeeRepository {
  public async findById(id: number): Promise<Employee> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM employees
          WHERE id = $1
      `,
      values: [id],
    });

    return rows[0];
  }

  public async create(fields: CreateEmployeeFields): Promise<Employee> {
    const {rows} = await pool.query({
      text: `
          INSERT INTO employees (${buildInsertQueryLeftValues(fields)})
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `,
      values: formatQueryValues(fields),
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
