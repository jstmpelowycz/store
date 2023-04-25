import {TABLES} from "../tables";

export const CREATE_PRODUCTS_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.products}
    (
        id          SERIAL       PRIMARY KEY,
        name        VARCHAR(50)  NOT NULL UNIQUE,
        description VARCHAR(100) NOT NULL,
        category_id INT          NOT NULL,
        FOREIGN KEY (category_id)
            REFERENCES ${TABLES.categories}(id)
            ON UPDATE CASCADE
            ON DELETE NO ACTION
    )
`;
