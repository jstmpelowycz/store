export interface Sale {
  store_product_upc: string;
  invoice_id: string;
  amount: number;
  selling_price: number;
}

export type CreateSaleFields = Sale;

export type UpdateSaleFields = Pick<Sale, 'amount'>;
