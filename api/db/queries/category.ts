export const CREATE_CATEGORIES_TABLE = `
    CREATE TABLE IF NOT EXISTS categories
    (
        id      SERIAL      PRIMARY KEY,
        name    VARCHAR(50) NOT NULL UNIQUE
    )
`;
