import {CreateProductFields, Product, UpdateProductFields} from "./product.typedefs";
import {buildUpdateQuerySetPart, formatQueryValues} from "../../../misc/helpers";
import {pool} from "../../index";

export class ProductRepository {
  public async findById(id: number): Promise<Product> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM products
          WHERE id = $1;
      `,
      values: [id]
    });

    return rows[0];
  }

  public async findAll(): Promise<Product[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM products
        ORDER BY name;
    `);

    return rows;
  }

  public async create(fields: CreateProductFields): Promise<Product> {
    const {rows} = await pool.query({
      text: `
          INSERT INTO products (name, description, category_id)
          VALUES ($1, $2, $3);
      `,
      values: Object.values(fields)
    });

    return rows[0];
  }

  public async updateById(
    id: number,
    fields: UpdateProductFields,
  ): Promise<Product> {
    const {rows} = await pool.query({
      text: `
          UPDATE products
          SET ${buildUpdateQuerySetPart(fields)}
          WHERE id = $1;
      `,
      values: [id, ...formatQueryValues(fields)]
    })

    return rows[0];
  }

  public async destroyById(id: number): Promise<boolean> {
    const {rows} = await pool.query({
      text: `
          DELETE
          FROM products
          WHERE id = $1;
      `,
      values: [id],
    });

    return rows.length !== 0;
  }
}
