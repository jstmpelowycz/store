import {NonIdentifiable} from "../../api.typedefs";

export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
}

export type CreateProductFields = NonIdentifiable<Product>;

export type UpdateProductFields = Pick<
  Product,
  'name' | 'description'
>;
