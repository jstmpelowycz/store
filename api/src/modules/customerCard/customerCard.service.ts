import {pool} from "../../index";
import {CustomerCard} from "./customerCard.typedefs";

export class CustomerCardService {
  public async getCustomerCardsByLastname(customer_last_name: string): Promise<CustomerCard[]> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM customer_cards
          WHERE customer_last_name = $1;
      `,
      values: [customer_last_name]
    });

    return rows;
  }

  public async getCustomerCardsByPercent(percent: number): Promise<CustomerCard[]> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM customer_cards
          WHERE percent = $1
          ORDER BY customer_last_name;
      `,
      values: [percent]
    });

    return rows;
  }
}
