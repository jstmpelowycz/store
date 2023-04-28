import {Repository} from "../utils/repository/repository";
import {Category} from "./category.typedefs";
import {FinderResult, GetterResult} from "../utils/repository/repository.typedefs";
import {CategoryError} from "./category.constants";
import {TABLES} from "../../db/tables";

export class CategoryRepository extends Repository {
  public async getAll(): Promise<Category[]> {
    return this.runQuery(`
        SELECT *
        FROM ${TABLES.categories}
        ORDER BY name;
    `);
  }

  public async findById(id: number): FinderResult<Category> {
    return this.runQuery(`
        SELECT *
        FROM ${TABLES.categories}
        WHERE ${TABLES.categories}.id = ${id};
    `);
  }

  public async getById(id: number): GetterResult<Category> {
    const category = await this.findById(id);

    if (!category) {
      return this.throwError({
        message: CategoryError.NotFound,
        fields: {
          id,
        },
      });
    }

    return category;
  }

  public async updateNameById(
    id: number,
    name: string,
  ): Promise<Category> {
    return this.runQuery(`
        UPDATE ${TABLES.categories}
        SET name = '${name}'
        WHERE id = ${id};
    `);
  }

  public async destroyById(id: number): Promise<boolean> {
    const affectedRowsCount = await this.runQuery(`
        DELETE
        FROM ${TABLES.categories}
        WHERE id = ${id};
    `);

    return affectedRowsCount !== 0;
  }
}
