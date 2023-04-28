import {CreateStoreProductFields, StoreProduct, UpdateStoreProductFields} from "./storeProduct.typedefs";
import {mapFieldsWithSqlValueWrapper} from "../../misc/helpers";
import {uuidClient} from "../../misc/uuidClient";
import {pool} from "../../index";

export class StoreProductRepository {
  public async create(fields: CreateStoreProductFields): Promise<StoreProduct> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const upc = uuidClient.generateUpc();

    const {
      upc_prom,
      selling_price,
      amount,
      is_promotional,
      product_id,
    } = processedFields;

    const {rows} = await pool.query(`
        INSERT INTO store_products (upc, upc_prom, selling_price,
                                    amount, is_promotional, product_id)
        VALUES (${upc},
                ${upc_prom},
                ${selling_price},
                ${amount},
                ${is_promotional},
                ${product_id};
    `);

    return rows[0];
  }

  public async updateByUpc(upc: string, fields: UpdateStoreProductFields): Promise<StoreProduct> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {
      upc_prom,
      selling_price,
      amount,
      is_promotional,
      product_id,
    } = processedFields;

    const {rows} = await pool.query(`
        UPDATE store_products
        SET upc_prom       = '${upc_prom}',
            selling_price  = ${selling_price},
            amount         = ${amount},
            is_promotional = ${is_promotional},
            product_id     = ${product_id}
        WHERE upc = ${upc};
    `);

    return rows[0];
  }

  public async findByUpc(upc: string): Promise<StoreProduct> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products
        WHERE upc = ${upc};
    `);

    return rows[0];
  }

  public async findAll(): Promise<StoreProduct[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM store_products
        ORDER BY selling_price;
    `);

    return rows;
  }

  public async destroyByUpc(upc: string): Promise<boolean> {
    const {rows} = await pool.query(`
        DELETE
        FROM store_products
        WHERE upc = ${upc};
    `);

    return rows.length !== 0;
  }
}
