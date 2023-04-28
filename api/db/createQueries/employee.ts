import {TABLES} from "../tables";

export const CREATE_EMPLOYEES_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.employees}
    (
        id              SERIAL PRIMARY KEY,
        first_name      VARCHAR(50)  NOT NULL,
        last_name       VARCHAR(50)  NOT NULL,
        patronymic      VARCHAR(50),
        email           VARCHAR(255) NOT NULL,
        password        VARCHAR(50)  NOT NULL,
        role            TEXT         NOT NULL
            CHECK (role IN ('MANAGER', 'CASHIER')),
        salary          NUMERIC(13, 4),
        birth_date      DATE         NOT NULL
            CHECK (EXTRACT(YEAR FROM age(now(), birth_date)) >= 18),
        employment_date DATE         NOT NULL
            CHECK (employment_date <= CURRENT_DATE),
        phone_number    VARCHAR(13)  NOT NULL UNIQUE
            CHECK (
                        phone_number LIKE '+%'
                    AND LENGTH(phone_number) <= 13
                ),
        city            VARCHAR(50)  NOT NULL,
        street          VARCHAR(50)  NOT NULL,
        zip_code        VARCHAR(9)   NOT NULL
    );
`;
