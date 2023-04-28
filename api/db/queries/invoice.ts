export const CREATE_INVOICES_TABLE = `
    CREATE TABLE IF NOT EXISTS invoices
    (
        id          VARCHAR(10) PRIMARY KEY,
        employee_id INT NOT NULL,
        card_id     VARCHAR(13),
        print_date  DATE NOT NULL DEFAULT CURRENT_DATE,
        total       NUMERIC(13, 4) NOT NULL 
            CHECK(total >= 0),
        vat         NUMERIC(13,4) GENERATED ALWAYS AS (total * 0.2) STORED,
        FOREIGN KEY (card_id)
            REFERENCES customer_cards(id) 
            ON UPDATE CASCADE
            ON DELETE NO ACTION,
        FOREIGN KEY (employee_id)
             REFERENCES employees(id)
             ON UPDATE CASCADE
             ON DELETE NO ACTION
    )
`;

