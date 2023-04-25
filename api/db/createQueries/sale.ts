import {TABLES} from "../tables";

export const CREATE_SALES_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.sales}
    (
        product_number    INT            NOT NULL,
        selling_price     NUMERIC(13, 4) NOT NULL,
        invoice_id        VARCHAR(10)    NOT NULL,
        store_product_upc VARCHAR(12)    NOT NULL,
        PRIMARY KEY (store_product_upc, invoice_id),
        FOREIGN KEY (invoice_id)
            REFERENCES ${TABLES.invoices} (id)
            ON UPDATE CASCADE
            ON DELETE NO ACTION,
        FOREIGN KEY (store_product_upc)
            REFERENCES ${TABLES.storeProduct} (upc)
            ON UPDATE CASCADE
            ON DELETE NO ACTION
    )
`;
