import {CreateInvoiceFields, Invoice} from "./invoice.typedefs";
import {pool} from "../../index";

export class InvoiceRepository {
  public async findById(id: string): Promise<Invoice> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM invoices
          WHERE id = $1
      `,
      values: [id],
    });

    return rows[0];
  }

  public async findAll(): Promise<Invoice[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM invoices
    `);

    return rows;
  }

  public async create(fields: CreateInvoiceFields): Promise<Invoice> {
    const {rows} = await pool.query({
      text: `
          INSERT INTO invoices (id, employee_id, card_id, print_date, total)
          VALUES ($1, $2, $3, $4, $5);
      `,
      values: Object.values(fields),
    });

    return rows[0];
  }

  public async destroyById(id: string): Promise<boolean> {
    const {rows} = await pool.query({
      text: `
          DELETE
          FROM invoices
          WHERE id = $1;
      `,
      values: [id]
    });

    return rows.length !== 0
  }
}
