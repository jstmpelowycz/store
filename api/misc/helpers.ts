import {snakeCase} from 'lodash'
import {AnyObject} from "../api.typedefs";

export enum Op {
  And = 'AND',
  Or = 'OR',
}

const asSqlKey = (key: string): string => snakeCase(key);

const asTypedValue = (value: any): any => {
  if (value === undefined || value === null) {
    return null;
  }

  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      return `'${value}'`;
    default:
      throw new Error('Unexpected type of value');
  }
};

export const asSqlValue = (value: any): number | string => {
  if (typeof value === 'undefined') {
    return 'null';
  }

  return typeof value === 'string'
    ? `'${value}'`
    : value;
};

export const mapFieldsWithSqlValueWrapper = (fields: AnyObject) => (
  Object.fromEntries(
    Object.entries(fields).map(([key, value]) => (
      [key, asSqlValue(value)]
    ))
  )
);

export const combineInsertValues = (fields: AnyObject): string => (
  Object.values(fields)
    .map(asSqlValue)
    .join(', ')
);

export const combineEqualityFilters = (filters: AnyObject, op: Op) => {
  return Object.entries(filters)
    .map(([key, value]) => {
      const leftSide = asSqlKey(key);
      const rightSide = asTypedValue(value);

      return rightSide
        ? `${leftSide} = ${rightSide}`
        : null;
    })
    .filter(Boolean)
    .join(` ${op} `);
};
