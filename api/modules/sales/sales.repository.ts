import {CreateSaleFields, Sale} from "./sales.typedefs";
import {pool} from "../../index";
import {mapFieldsWithSqlValueWrapper} from "../../misc/helpers";

export class SalesRepository {
  public async findByInvoiceIdAndUpc(invoiceId: string, upc: string): Promise<Sale> {
    const {rows} = await pool.query(`
        SELECT *
        FROM sales
        WHERE store_product_upc = ${upc}
          AND invoice_id = ${invoiceId};
    `);

    return rows[0];
  }

  public async findAll(): Promise<Sale[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM sales;
    `);

    return rows;
  }

  public async create(fields: CreateSaleFields): Promise<Sale> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {
      store_product_upc,
      invoice_id,
      amount,
      selling_price,
    } = processedFields;

    const {rows} = await pool.query(`
        INSERT INTO sales (store_product_upc, amount, selling_price, invoice_id)
        VALUES (${store_product_upc}, 
                ${amount}, 
                ${selling_price}, 
                ${invoice_id});
    `);

    return rows[0];
  }

  public async destroyByInvoiceIdAndUpc(
    invoiceId: string,
    upc: string,
  ): Promise<boolean> {
    const {rows} = await pool.query(`
        DELETE
        FROM sales
        WHERE store_product_upc = ${upc}
          AND invoice_id = ${invoiceId};
    `);

    return rows.length !== 0;
  }
}
