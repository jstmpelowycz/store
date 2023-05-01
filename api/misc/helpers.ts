import {AnyObject} from "../api.typedefs";

export const asSqlValue = (value: any): number | string => {
  if (typeof value === 'undefined') {
    return 'null';
  }

  return typeof value === 'string'
    ? `${value}`
    : Number(value);
};

export const mapFieldsWithSqlValueWrapper = (fields: AnyObject): AnyObject => (
  Object.fromEntries(
    Object.entries(fields).map(([key, value]) => (
      [key, asSqlValue(value)]
    ))
  )
);

export const excludeEmptyValues = <V>(fields: Record<string, V>): V[] => {
  return Object.values(fields).filter(Boolean);
}

export const buildUpdateQuerySetPart = (fields: AnyObject, startAt = 0): string => {
  return Object.entries(fields)
    .filter(([_, value]) => Boolean(value))
    .map(([key, _], index) => `${key} = $${index + startAt + 1}`)
    .join(', ');
};
