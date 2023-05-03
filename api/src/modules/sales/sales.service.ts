import {SalesRepository} from "./sales.repository";
import {CreateSaleFields, Sale} from "./sales.typedefs";
import {pool} from "../../index";
import {Throwable} from "../../../typings/api.typedefs";
import {SalesError} from "./sales.constants";

type CreateSaleWithPromotionFields = Omit<CreateSaleFields, 'selling_price'>;

export class SalesService {
    private salesRepository = new SalesRepository();

    public async createAndApplyPromotion(
        fields: CreateSaleWithPromotionFields,
    ): Promise<Sale> {
        const {store_product_upc, invoice_id, amount} = fields;

        const {rows} = await pool.query({
            text: `
                SELECT CASE
                           WHEN sp.is_promotional
                               THEN ($1 * sp.selling_price * 0.8)
                           ELSE ($1 * sp.selling_price)
                           END
                FROM store_products sp
                WHERE sp.upc = $2;
            `,
            values: [amount, store_product_upc],
        });

        const sellingPrice = Number(Object.values(rows[0]));

        const promiseSale = this.salesRepository.create({
            store_product_upc: store_product_upc,
            invoice_id: invoice_id,
            amount: amount,
            selling_price: sellingPrice,
        });

        await this.verifySellingAmount({
            store_product_upc,
            amount,
        });

        await this.updateStoredAmount({
          store_product_upc,
          amount,
        })

        await this.updateInvoiceTotal(
            {invoice_id},
            sellingPrice,
        );

        return promiseSale;
    }

    private async updateInvoiceTotal(
        options: Omit<CreateSaleWithPromotionFields, 'amount' | 'store_product_upc'>,
        sellingPrice: number,
    ): Promise<Throwable<void>> {
        const {invoice_id} = options;

        const {rows} = await pool.query({
            text: `
                SELECT total
                FROM invoices
                WHERE id = $1
            `,
            values: [invoice_id]
        });

        const retrievedTotal = rows[0];

        const updatedTotal = Number(retrievedTotal.amount + sellingPrice);

        await pool.query({
            text: `
                UPDATE invoices
                SET total = $2
                WHERE id = $1
            `,
            values: [invoice_id, updatedTotal]
        })

    }

    private async updateStoredAmount(
        options: Omit<CreateSaleWithPromotionFields, 'invoice_id'>,
    ): Promise<Throwable<void>> {
        const {store_product_upc, amount} = options;

        const {rows} = await pool.query({
            text: `
                SELECT amount
                FROM store_products
                WHERE upc = $1
            `,
            values: [store_product_upc]
        });

        const retrievedAmount = rows[0];
        const updatedAmount = Number(retrievedAmount.amount - amount);

        await pool.query({
            text: `
                UPDATE store_products
                SET amount = $2
                WHERE upc = $1
            `,
            values: [store_product_upc, updatedAmount]
        })

    }

    private async verifySellingAmount(
        options: Omit<CreateSaleWithPromotionFields, 'invoice_id'>,
    ): Promise<Throwable<void>> {
        const {store_product_upc, amount} = options;

        const {rows} = await pool.query({
            text: `
                SELECT amount
                FROM store_products
                WHERE upc = $1
            `,
            values: [store_product_upc]
        });

        const retrievedAmount = rows[0];

        if (retrievedAmount < amount) {
            throw new Error(SalesError.RequestedAmountNotAvailable);
        }
    }
}
