import {AnyAsyncFunction, Maybe, Throwable} from "../../../api.typedefs";

export type FinderResult<T> = Promise<Maybe<T>>;

export type GetterResult<T> = Promise<Throwable<T>>;

export type QueryWrapper<RT = void> = (
  callback: AnyAsyncFunction,
) => Promise<Throwable<RT>>;

export type AsyncQueryWrapper<RT> = Promise<QueryWrapper<RT>>;
