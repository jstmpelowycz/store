export const CREATE_PRODUCTS_TABLE = `
    CREATE TABLE IF NOT EXISTS products
    (
        id          SERIAL       PRIMARY KEY,
        name        VARCHAR(50)  NOT NULL UNIQUE,
        description VARCHAR(100) NOT NULL,
        category_id INT          NOT NULL,
        FOREIGN KEY (category_id)
            REFERENCES categories(id)
            ON UPDATE CASCADE
            ON DELETE NO ACTION
    )
`;
