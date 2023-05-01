import {Dispatch, SetStateAction} from "react";

export type Maybe<T> = T | null;

export type Throwable<T extends any = any> = T | never;

export interface AnyObject {
  [key: string]: any;
}

export type AnyFunction = (...args: any[]) => any;

export type Identifiable<T extends AnyObject = {}> = T & { id: number };

export type NonIdentifiable<T extends Identifiable> = Omit<T, 'id'>;

export type SetState<S> = Dispatch<SetStateAction<S>>;
