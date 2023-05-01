import {pool} from "../../index";
import {CustomerCard} from "./customerCard.typedefs";

export class CustomerCardService {
  public async getCustomerCardsByLastname(customer_last_name: string): Promise<CustomerCard[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM customer_cards
        WHERE customer_last_name = ${customer_last_name};
    `);
    return rows[0];
  }

  public async getCustomerCardsByPercent(percent: number): Promise<CustomerCard[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM customer_cards
        WHERE percent = ${percent}
        ORDER BY customer_last_name;
    `);
    return rows;
  }
}
