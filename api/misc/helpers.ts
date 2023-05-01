import {AnyObject} from "../api.typedefs";

const asSortedEntries = <V>(object: Record<string, V>): Array<[string, V]> => {
  return Object.entries(object).sort(([keyA], [keyB]) => (
    keyA.localeCompare(keyB)
  ));
};

const buildSetExpression = (
  fieldName: string,
  valueIndex: number,
  startAt: number,
) => (
  `${fieldName} = $${valueIndex + startAt + 1}`
);

export const buildUpdateQuerySetPart = (fields: AnyObject, startAt = 1): string => {
  return asSortedEntries(fields)
    .filter(([_, value]) => Boolean(value))
    .map(([key, _], index) => buildSetExpression(key, index, startAt))
    .sort()
    .join(', ');
};

export const formatQueryValues = <V>(fields: Record<string, V>): V[] => {
  return asSortedEntries(fields)
    .map(([_, value]) => value)
    .filter(Boolean);
};
