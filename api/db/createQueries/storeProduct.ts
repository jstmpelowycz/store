import {TABLES} from "../tables";

export const CREATE_STORE_PRODUCTS_TABLE = `
    CREATE TABLE ${TABLES.storeProduct}
    (
        upc            VARCHAR(12)    NOT NULL PRIMARY KEY,
        selling_price  NUMERIC(13, 4) NOT NULL,
        amount         INT            NOT NULL,
        is_promotional BOOLEAN        NOT NULL,
        product_id     INT            NOT NULL,
        FOREIGN KEY (product_id)
            REFERENCES ${TABLES.products} (id)
            ON UPDATE CASCADE
            ON DELETE NO ACTION
    )
`;
