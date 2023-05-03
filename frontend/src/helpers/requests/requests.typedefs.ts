import {AnyObject} from "../../typings/typedefs";

export interface RequestOptions {
  url: string;
  body?: AnyObject;
}

export type RequestTuple = [
  url: string,
  init?: RequestInit,
];

export type RF<T = void> = (...args: any[]) => Promise<T>;
