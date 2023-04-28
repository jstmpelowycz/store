import {NonIdentifiable} from "../../api.typedefs";

export interface StoreProduct {
  upc: string;
  upc_prom?: string;
  selling_price: number;
  amount: number;
  is_promotional: boolean;
  product_id: number;
}

type MutableStoreProductFields = Omit<StoreProduct, 'upc'>

export type CreateStoreProductFields = MutableStoreProductFields;

export type UpdateStoreProductFields = MutableStoreProductFields;
