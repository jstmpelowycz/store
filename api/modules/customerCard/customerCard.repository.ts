import {CreateCustomerCardFields, CustomerCard, UpdateCustomerCardFields} from "./customerCard.typedefs";
import {pool} from "../../index";
import {buildUpdateQuerySetPart, formatQueryValues} from "../../misc/helpers";

export class CustomerCardRepository {
  public async findById(id: string): Promise<CustomerCard> {
    const {rows} = await pool.query({
      text: `
          SELECT *
          FROM customer_cards
          WHERE id = $1;
      `,
      values: [id],
    });

    return rows[0];
  }

  public async findAll(): Promise<CustomerCard[]> {
    const {rows} = await pool.query(`
        SELECT *
        FROM customer_cards;
    `);

    return rows;
  }

  public async create(fields: CreateCustomerCardFields): Promise<CustomerCard> {
    const {rows} = await pool.query({
      text: `
          INSERT INTO customer_cards (id, customer_last_name, customer_first_name,
                                      customer_patronymic, phone_number, city, street,
                                      zip_code, percent)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      values: Object.values(fields),
    });

    return rows[0];
  }

  public async updateById(id: string, fields: UpdateCustomerCardFields): Promise<CustomerCard> {
    const {rows} = await pool.query({
      text: `
          UPDATE customer_cards
          SET ${buildUpdateQuerySetPart(fields)}
          WHERE id = $1;
      `,
      values: [id, ...formatQueryValues(fields)]
    });


    return rows[0];
  }

  public async destroyById(id: string): Promise<boolean> {
    const {rows} = await pool.query({
      text: `
          DELETE
          FROM customer_cards
          WHERE id = $1;
      `,
      values: [id]
    });

    return rows.length !== 0;
  }
}
