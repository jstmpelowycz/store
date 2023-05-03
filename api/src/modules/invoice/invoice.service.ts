import {pool} from "../../index";
import {Invoice} from "./invoice.typedefs";

export class InvoiceService {
  public async findAllInvoicesByPeriod(start: string, end: string): Promise<Invoice[]> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM invoices AS i
                   JOIN sales AS s ON i.id = s.invoice_id
                   JOIN store_products AS sp ON s.store_product_upc = sp.upc
                   JOIN products AS p ON sp.product_id = p.id
          WHERE print_date >= $1
            AND print_date < $2;
      `,
      values: [start, end]
    });

    return rows;
  }

  public async findAllByCashierAndPeriod(
    cashier_last_name: string,
    start: string,
    end: string
  ): Promise<Invoice[]> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM invoices AS i
                   JOIN sales AS s ON i.id = s.invoice_id
                   JOIN store_products AS sp ON s.store_product_upc = sp.upc
                   JOIN products AS p ON sp.product_id = p.id
                   JOIN employees AS e ON i.employee_id = e.id
          WHERE e.last_name = $1
            AND e.role = 'CASHIER'
            AND print_date >= $2
            AND print_date < $3;

      `,
      values: [cashier_last_name, start, end],
    });

    return rows;
  }
}
