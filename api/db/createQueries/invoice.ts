import {TABLES} from "../tables";

export const CREATE_INVOICES_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.invoices}
    (
        id          VARCHAR(10) PRIMARY KEY,
        employee_id INT NOT NULL,
        card_id     VARCHAR(13),
        print_date  DATE NOT NULL DEFAULT CURRENT_DATE,
        total       NUMERIC(13, 4) NOT NULL 
            CHECK(total >= 0),
        vat         NUMERIC(13,4) GENERATED ALWAYS AS (total * 0.2) STORED,
        FOREIGN KEY (card_id)
            REFERENCES ${TABLES.customerCard} (id) 
            ON UPDATE CASCADE
            ON DELETE NO ACTION,
        FOREIGN KEY (employee_id)
             REFERENCES ${TABLES.employees} (id)
             ON UPDATE CASCADE
             ON DELETE NO ACTION
    )
`;

