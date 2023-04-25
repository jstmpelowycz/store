import {TABLES} from "../tables";

export const CREATE_EMPLOYEES_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.employees}
    (
        id              SERIAL      NOT NULL PRIMARY KEY,
        first_name      VARCHAR(50) NOT NULL,
        last_name       VARCHAR(50) NOT NULL,
        patronymic      VARCHAR(50),
        role            VARCHAR(10),
        salary          NUMERIC(13, 4),
        birth_date      DATE        NOT NULL,
        employment_date DATE        NOT NULL,
        phone_number    VARCHAR(13) NOT NULL,
        city            VARCHAR(50) NOT NULL,
        street          VARCHAR(50) NOT NULL,
        zip_code        VARCHAR(9)  NOT NULL
    )
`;
