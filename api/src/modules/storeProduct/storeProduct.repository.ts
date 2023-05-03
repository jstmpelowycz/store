import {CreateStoreProductFields, StoreProduct, UpdateStoreProductFields} from "./storeProduct.typedefs";
import {buildUpdateQuerySetPart, formatQueryValues} from "../../../misc/helpers";
import {uuidClient} from "../../../misc/uuidClient";
import {pool} from "../../index";

export class StoreProductRepository {
  public async create(fields: CreateStoreProductFields): Promise<StoreProduct> {
    const upc = uuidClient.generateUpc();

    const {rows} = await pool.query({
      text: `
          INSERT INTO store_products (upc, upc_prom, selling_price,
                                      amount, is_promotional, product_id)
          VALUES ($1, $2, $3, $4, $5, $6)
      `,
      values: [upc, ...Object.values(fields)],
    });

    return rows[0];
  }

  public async updateByUpc(upc: string, fields: UpdateStoreProductFields): Promise<StoreProduct> {
    const {rows} = await pool.query({
      text: `
          UPDATE store_products
          SET ${buildUpdateQuerySetPart(fields)}
          WHERE upc = $1;
      `,
      values: [upc, ...formatQueryValues(fields)]
    });

    return rows[0];
  }

  public async findByUpc(upc: string): Promise<StoreProduct> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM store_products
          WHERE upc = $1;
      `,
      values: [upc]
    });

    return rows[0];
  }

  public async findAll(): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products
        JOIN products p on p.id = store_products.product_id
        ORDER BY selling_price;
    `);

    return rows;
  }

  public async destroyByUpc(upc: string): Promise<boolean> {
    const {rows} = await pool.query({
      text: `
          DELETE
          FROM store_products
          WHERE upc = $1;
      `,
      values: [upc]
    });

    return rows.length !== 0;
  }
}
