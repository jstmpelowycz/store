import {AnyObject} from "../api.typedefs";

export const asSqlValue = (value: any): number | string => {
  if (typeof value === 'undefined') {
    return 'null';
  }

  return typeof value === 'string'
    ? `'${value}'`
    : value;
};

export const mapFieldsWithSqlValueWrapper = (fields: AnyObject): AnyObject => (
  Object.fromEntries(
    Object.entries(fields).map(([key, value]) => (
      [key, asSqlValue(value)]
    ))
  )
);
