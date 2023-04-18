import {Repository} from "../utils/repository/repository";
import {Category} from "./category.typedefs";
import {FinderResult, GetterResult} from "../utils/repository/repository.typedefs";
import {CategoryError} from "./category.constants";
import {TABLES} from "../../db/tables";

export class CategoryRepository extends Repository {
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
      this.throwError({
        message: CategoryError.NotFound,
        fields: {
          id,
        },
      });
    }

    return category;
  }
}
