import {AnyObject} from "../../../typings/typedefs";

export const parseColumnNames = <E extends AnyObject>(entities: E[]) => {
  return Object.keys(entities[0]);
}

export const parseRecords = <E extends AnyObject>(entities: E[]) => {
  return entities.map(entity => Object.values(entity));
}
