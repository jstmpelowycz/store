import {CreateCustomerCardFields, CustomerCard, UpdateCustomerCardFields} from "./customerCard.typedefs";
import {pool} from "../../index";
import {mapFieldsWithSqlValueWrapper} from "../../misc/helpers";

export class CustomerCardRepository {
  public async findById(id: string): Promise<CustomerCard> {
    const {rows} = await pool.query(`
        SELECT *
        FROM customer_cards
        WHERE id = ${id};
    `);

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
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {
      id,
      customer_last_name,
      customer_first_name,
      customer_patronymic,
      phone_number,
      city,
      street,
      zip_code,
      percent
    } = processedFields;

    const {rows} = await pool.query(`
        INSERT INTO customer_cards (id, customer_last_name, customer_first_name,
                                    customer_patronymic, phone_number, city, street,
                                    zip_code, percent)
        VALUES (${id},
                ${customer_last_name},
                ${customer_first_name},
                ${customer_patronymic},
                ${phone_number},
                ${city},
                ${street},
                ${zip_code},
                ${percent})
    `);

    return rows[0];
  }

  public async updateById(id: string, fields: UpdateCustomerCardFields): Promise<CustomerCard> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const {
      customer_last_name,
      customer_first_name,
      customer_patronymic,
      phone_number,
      city,
      street,
      zip_code,
      percent,
    } = processedFields;

    const {rows} = await pool.query(`
        UPDATE customer_cards
        SET customer_last_name  = ${customer_last_name},
            customer_first_name = ${customer_first_name},
            customer_patronymic = ${customer_patronymic},
            phone_number        = ${phone_number},
            city                = ${city},
            street              = ${street},
            zip_code            = ${zip_code},
            percent             = ${percent}
        WHERE id = ${id};
    `);

    return rows[0];
  }

  public async destroyById(id: string): Promise<boolean> {
    const {rows} = await pool.query(`
        DELETE FROM customer_cards
        WHERE id = ${id};
    `);

    return rows.length !== 0;
  }
}
