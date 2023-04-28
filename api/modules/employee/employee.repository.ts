import {Repository} from "../utils/repository/repository";
import {NonIdentifiable} from "../../api.typedefs";
import {FinderResult, GetterResult} from "../utils/repository/repository.typedefs";
import {CreateEmployeeFields, Employee, UpdateEmployeeFields} from "./employee.typedefs";
import {EmployeeError} from "./employee.constants";
import {TABLES} from "../../db/tables";
import {
  combineEqualityFilters,
  combineInsertValues,
  Op,
  mapFieldsWithSqlValueWrapper,
  asSqlValue
} from "../../misc/helpers";

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
      return this.throwError({
        message: EmployeeError.NotFound,
        fields: {
          options,
        },
      });
    }

    return employee;
  }

  public async create(fields: CreateEmployeeFields): Promise<Employee> {
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
    } = fields;
    return this.runQuery(`
        INSERT INTO ${TABLES.employees} (email, password, last_name, first_name, patronymic,
                                         role, salary, birth_date, employment_date,
                                         phone_number, city, street, zip_code)
        VALUES (${asSqlValue(email)},
                ${asSqlValue(password)},
                ${asSqlValue(last_name)},
                ${asSqlValue(first_name)},
                ${asSqlValue(patronymic)},
                ${asSqlValue(role)},
                ${asSqlValue(salary)},
                ${asSqlValue(birth_date)},
                ${asSqlValue(employment_date)},
                ${asSqlValue(phone_number)},
                ${asSqlValue(city)},
                ${asSqlValue(street)},
                ${asSqlValue(zip_code)})
    `);
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

    return this.runQuery(`
        UPDATE ${TABLES.employees}
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
  }

  public async destroyById(id: number): Promise<boolean> {
    const affectedRowsCount = await this.runQuery(`
        DELETE
        FROM ${TABLES.employees}
        WHERE id = ${id};
    `);

    return affectedRowsCount !== 0;
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
      return this.throwError({
        message: EmployeeError.NotFound,
        fields: {
          email,
        },
      });
    }

    return employee;
  }
}
