import {Repository} from "../utils/repository/repository";
import {CreateProductFields, Product, UpdateProductFields} from "./product.typedefs";
import {TABLES} from "../../db/tables";
import {combineInsertValues, mapFieldsWithSqlValueWrapper} from "../../misc/helpers";
import * as process from "process";

export class ProductRepository extends Repository {
  public async create(fields: CreateProductFields): Promise<Product> {
    return this.runQuery(`
        INSERT INTO ${TABLES.products} (name, description, category_id)
        VALUES (${combineInsertValues(fields)});
    `);
  }

  public async updateById(
    id: number,
    fields: UpdateProductFields,
  ): Promise<Product> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {name, description} = processedFields;

    return this.runQuery(`
        UPDATE ${TABLES.products}
        SET name        = '${name}',
            description = '${description}'
        WHERE id = ${id};
    `);
  }

  public async destroyById(id: number): Promise<boolean> {
    const affectedRowsCount = await this.runQuery(`
      DELETE
      FROM ${TABLES.products}
      WHERE id = ${id};
    `);

    return affectedRowsCount !== 0;
  }
}
