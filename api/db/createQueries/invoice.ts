import {TABLES} from "../tables";

export const CREATE_INVOICES_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.invoices}
    (
        id          VARCHAR(10)    NOT NULL PRIMARY KEY,
        vat         NUMERIC(13, 4) NOT NULL,
        total       NUMERIC(13, 4) NOT NULL,
        print_date  DATE           NOT NULL,
        card_id     VARCHAR(13),
        employee_id VARCHAR(10)    NOT NULL,
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

