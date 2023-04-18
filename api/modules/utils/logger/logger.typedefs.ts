import {AnyObject} from "../../../api.typedefs";

export type Logger = typeof console;

export interface LoggerInput {
  message: string;
  fields?: AnyObject;
}
