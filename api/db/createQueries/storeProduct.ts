import {TABLES} from "../tables";

export const CREATE_STORE_PRODUCTS_TABLE = `
    CREATE TABLE ${TABLES.storeProduct}
    (
        upc            VARCHAR(12)    NOT NULL PRIMARY KEY,
        upc_prom       VARCHAR(12) UNIQUE,
        selling_price  NUMERIC(13, 4) NOT NULL
            CHECK (selling_price > 0),
        amount         INT            NOT NULL
            CHECK (amount > 0),
        is_promotional BOOLEAN        NOT NULL,
        product_id     INT            NOT NULL UNIQUE,
        CONSTRAINT only_two_stored_products UNIQUE (product_id, is_promotional)
            FOREIGN KEY (product_id)
            REFERENCES ${TABLES.products}(id)
            ON UPDATE CASCADE
            ON DELETE NO ACTION,
        FOREIGN KEY (upc_prom)
            REFERENCES ${TABLES.storeProduct} (upc)
            ON UPDATE CASCADE
            ON DELETE SET NULL
    )
`;
