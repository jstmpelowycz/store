import {CreateInvoiceFields, Invoice} from "./invoice.typedefs";
import {pool} from "../../index";
import {mapFieldsWithSqlValueWrapper} from "../../misc/helpers";

export class InvoiceRepository {
  public async findById(id: string): Promise<Invoice> {
    const {rows} = await pool.query(`
        SELECT *
        FROM invoices
        WHERE id = ${id}
    `);

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
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {
      id,
      employee_id,
      card_id,
      print_date,
      total,
    } = processedFields;

    const {rows} = await pool.query(`
        INSERT INTO invoices (id, employee_id, card_id, print_date, total)
        VALUES (${id},
                ${employee_id},
                ${card_id},
                ${print_date},
                ${total});
    `);

    return rows[0];
  }

  public async destroyById(id: string): Promise<boolean> {
    const {rows} = await pool.query(`
        DELETE
        FROM invoices
        WHERE id = ${id};
    `);

    return rows.length !== 0
  }
}
