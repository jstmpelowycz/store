import {TABLES} from "../tables";

export const CREATE_CATEGORIES_TABLE = `
    CREATE TABLE IF NOT EXISTS ${TABLES.categories}
    (
        id   SERIAL      NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    )
`;
