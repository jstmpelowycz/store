import {CreateProductFields, Product, UpdateProductFields} from "./product.typedefs";
import {asSqlValue, mapFieldsWithSqlValueWrapper} from "../../misc/helpers";
import {pool} from "../../index";

export class ProductRepository {
  public async findById(id: number): Promise<Product> {
    const {rows} = await pool.query(`
        SELECT *
        FROM products
        WHERE id = ${id};
    `);

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
    const {name, description, category_id} = fields;

    const {rows} = await pool.query(`
        INSERT INTO products (name, description, category_id)
        VALUES (${asSqlValue(name)},
                ${asSqlValue(description)},
                ${asSqlValue(category_id)});
    `);

    return rows[0];
  }

  public async updateById(
    id: number,
    fields: UpdateProductFields,
  ): Promise<Product> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {name, description} = processedFields;

    const {rows} = await pool.query(`
        UPDATE products
        SET name        = '${name}',
            description = '${description}'
        WHERE id = ${id};
    `)

    return rows[0];
  }

  public async destroyById(id: number): Promise<boolean> {
    const {rows} = await pool.query(`
        DELETE
        FROM products
        WHERE id = ${id};
    `);

    return rows.length !== 0;
  }
}
