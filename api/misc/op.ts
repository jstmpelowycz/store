import * as sc from 'snakecase';
import {AnyObject} from "../api.typedefs";

export enum Op {
  And = 'AND',
  Or = 'OR',
}

const asSqlKey = (key: string): string => sc(key);

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
