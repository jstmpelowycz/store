import {SalesRepository} from "./sales.repository";
import {CreateSaleFields, Sale} from "./sales.typedefs";
import {pool} from "../../index";
import {Throwable} from "../../api.typedefs";
import {SalesError} from "./sales.constants";

type CreateSaleWithPromotionFields = Omit<CreateSaleFields, 'selling_price'>;

export class SalesService {
  private salesRepository = new SalesRepository();

  public async createAndApplyPromotion(
    fields: CreateSaleWithPromotionFields,
  ): Promise<Sale> {
    const {store_product_upc, invoice_id, amount} = fields;

    const {rows} = await pool.query(`
        SELECT CASE
                   WHEN sp.is_promotional THEN (${amount} * sp.selling_price * 0.8)
                   ELSE (${amount} * sp.selling_price)
                   END
        FROM store_products sp
        WHERE sp.upc = ${store_product_upc};
    `);

    const sellingPrice = rows[0];

    await this.verifySellingAmount({
      store_product_upc,
      amount,
    });

    return this.salesRepository.create({
      store_product_upc,
      invoice_id,
      amount,
      selling_price: sellingPrice,
    });
  }

  private async verifySellingAmount(
    options: Omit<CreateSaleWithPromotionFields, 'invoice_id'>,
  ): Promise<Throwable<void>> {
    const {store_product_upc, amount} = options;

    const {rows} = await pool.query(`
        SELECT amount
        FROM store_products
        WHERE upc = ${store_product_upc}
    `);

    const retrievedAmount = rows[0];

    if (retrievedAmount < amount) {
      throw new Error(SalesError.RequestedAmountNotAvailable);
    }
  }
}