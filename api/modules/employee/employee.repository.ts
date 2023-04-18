import {Repository} from "../utils/repository/repository";
import {NonIdentifiable} from "../../api.typedefs";
import {FinderResult, GetterResult} from "../utils/repository/repository.typedefs";
import {CreateEmployeeFields, Employee} from "./employee.typedefs";
import {EmployeeError} from "./employee.constants";
import {TABLES} from "../../db/tables";
import {combineEqualityFilters, Op} from "../../misc/op";

export type Filters = Partial<NonIdentifiable<Employee>>;

export interface RetrieveByFiltersOptions {
  filters: Filters;
  op: Op;
  limit?: number;
}

export class EmployeeRepository extends Repository {
  public async findOneByFilters(options: RetrieveByFiltersOptions): FinderResult<Employee> {
    const {filters, op} = options;

    return this.runQuery(`
      SELECT *
      FROM ${TABLES.employees}
      WHERE ${combineEqualityFilters(filters, op)}
      LIMIT 1;
    `);
  }

  public async getOneByFilters(options: RetrieveByFiltersOptions): GetterResult<Employee> {
    const employee = await this.findOneByFilters(options);

    if (!employee) {
      this.throwError({
        message: EmployeeError.NotFound,
        fields: {
          options,
        },
      });
    }

    return employee;
  }

  public async findByEmail(email: string): FinderResult<Employee> {
    return this.runQuery(`
      SELECT *
      FROM ${TABLES.employees}
      WHERE ${TABLES.employees}.email = ${email};
    `);
  }

  public async getByEmail(email: string): GetterResult<Employee> {
    const employee = await this.findByEmail(email);

    if (!employee) {
      this.throwError({
        message: EmployeeError.NotFound,
        fields: {
          email,
        },
      });
    }

    return employee;
  }

  public async create(fields: CreateEmployeeFields): Promise<Employee> {
    return this.runQuery(``);
  }
}
