import {Category} from "./category.typedefs";
import {CategoryError} from "./category.constants";
import {pool} from "../../index";
import {Throwable} from "../../api.typedefs";

export class CategoryRepository {
  public async findAll(): Promise<Category[]> {
    const {rows: categories} = await pool.query(`
        SELECT *
        FROM categories
        ORDER BY name;
    `);

    return categories;
  }

  public async findById(id: number): Promise<Category> {
    const {rows} = await pool.query<Category>(`
        SELECT *
        FROM categories
        WHERE id = ${id};
    `);

    return rows[0];
  }

  public async getById(id: number): Promise<Throwable<Category>> {
    const category = await this.findById(id);

    if (!category) {
      throw new Error(CategoryError.NotFound);
    }

    return category;
  }

  public async updateById(id: number, name: string): Promise<Category> {
    const {rows} = await pool.query(`
        UPDATE categories
        SET name = '${name}'
        WHERE id = ${id};
    `);

    return rows[0];
  }

  public async create(name: string): Promise<Category> {
    const {rows} = await pool.query(`
        INSERT INTO categories (name)
        VALUES (${name});
    `);

    return rows[0];
  }

  public async destroyById(id: number): Promise<boolean> {
    const {rows} = await pool.query(`
        DELETE
        FROM categories
        WHERE id = ${id};
    `);

    return rows.length !== 0;
  }
}
