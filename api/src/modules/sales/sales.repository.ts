import {CreateSaleFields, Sale} from "./sales.typedefs";
import {pool} from "../../index";

export class SalesRepository {
  public async findByInvoiceIdAndUpc(invoiceId: string, upc: string): Promise<Sale> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM sales
          WHERE store_product_upc = $1
            AND invoice_id = $2;
      `,
      values: [upc, invoiceId]
    });

    return rows[0];
  }

  public async findByInvoiceId(invoiceId: string): Promise<Sale> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM sales
          WHERE invoice_id = $1;
      `,
      values: [invoiceId]
    });

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
    const {rows} = await pool.query({
      text: `
          INSERT INTO sales (store_product_upc, amount, selling_price, invoice_id)
          VALUES ($1, $2, $3, $4);
      `,
      values: Object.values(fields)
    });

    return rows[0];
  }

  public async destroyByInvoiceIdAndUpc(
    invoiceId: string,
    upc: string,
  ): Promise<boolean> {
    const {rows} = await pool.query({
      text: `
          DELETE
          FROM sales
          WHERE store_product_upc = $1
            AND invoice_id = $2;
      `,
      values: [upc, invoiceId]
    });

    return rows.length !== 0;
  }
}
