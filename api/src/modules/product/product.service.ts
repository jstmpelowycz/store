import {Product} from "./product.typedefs";
import {pool} from "../../index";

export class ProductService {
  public async findByCategoryName(name: string): Promise<Product[]> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM products p
          WHERE p.category_id IN (SELECT c.id
                                  FROM categories c
                                  WHERE c.name = $1)
      `,
      values: [name],
    });

    return rows;
  }
}
