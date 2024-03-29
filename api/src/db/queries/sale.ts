export const CREATE_SALES_TABLE = `
    CREATE TABLE IF NOT EXISTS sales
    (
        store_product_upc VARCHAR(12)   NOT NULL,
        amount            INT           NOT NULL 
            CHECK (amount > 0),
        selling_price     NUMERIC(13,4) NOT NULL 
            CHECK (selling_price > 0),
        invoice_id        VARCHAR(10)   NOT NULL,
        PRIMARY KEY (store_product_upc, invoice_id),
        FOREIGN KEY (invoice_id)
            REFERENCES invoices(id)
            ON UPDATE CASCADE
            ON DELETE NO ACTION,
        FOREIGN KEY (store_product_upc)
            REFERENCES store_products(upc)
            ON UPDATE CASCADE
            ON DELETE NO ACTION
    )
`;
