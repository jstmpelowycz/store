import {TABLES} from "../tables";

export const CREATE_CUSTOMER_CARDS_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.customerCard}
    (
        id                  VARCHAR(13) PRIMARY KEY,
        customer_last_name  VARCHAR(50) NOT NULL,
        customer_first_name VARCHAR(50) NOT NULL,
        customer_patronymic VARCHAR(50),
        phone_number        VARCHAR(13) NOT NULL UNIQUE CHECK (
            phone_number LIKE '+%'
            AND LENGTH(phone_number) <= 13
        ),
        city                VARCHAR(50) NOT NULL,
        street              VARCHAR(50) NOT NULL,
        zip_code            VARCHAR(9)  NOT NULL,
        percent             INT         NOT NULL CHECK (percent > 0)
    )
`;
