import {Repository} from "../utils/repository/repository";
import {CreateStoreProductFields, StoreProduct, UpdateStoreProductFields} from "./storeProduct.typedefs";
import {combineInsertValues, mapFieldsWithSqlValueWrapper} from "../../misc/helpers";
import {TABLES} from "../../db/tables";
import {uuidClient} from "../../misc/uuidClient";

export class StoreProductRepository extends Repository {
  public async create(fields: CreateStoreProductFields): Promise<StoreProduct> {
    const processedFields = mapFieldsWithSqlValueWrapper(fields);

    const upc = uuidClient.generateUpc();

    return this.runQuery(`
        INSERT INTO ${TABLES.storeProducts} (upc, upc_prom, selling_price, amount, is_promotional, product_id)
        VALUES (${upc}, ${combineInsertValues(processedFields)});
    `)
  }
}
