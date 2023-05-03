import {DEFAULT_INIT_HEADERS, RequestType} from "./requests.constants";
import {AnyObject} from "../../typings/typedefs";
import {RequestOptions, RequestTuple} from "./requests.typedefs";

const asServerUrl = (url: string) => (
  `http://localhost:5460${url}`
);

const makeRequestInit = (type: RequestType, body?: AnyObject): RequestInit => {
  return {
    ...DEFAULT_INIT_HEADERS,
    method: type,
    body: JSON.stringify(body),
  };
};

export const makeRequestTuple = (type: RequestType, options: RequestOptions): RequestTuple => {
  const {url, body} = options;

  const completeUrl = asServerUrl(url);

  switch (type) {
    case RequestType.Post:
    case RequestType.Put:
    case RequestType.Delete:
      return [completeUrl, makeRequestInit(type, body)];

    case RequestType.Get:
    default:
      return [completeUrl];
  }
};

export const makeRequest = async <RV>(
  type: RequestType,
  options: RequestOptions,
): Promise<RV> => {
  const [completeUrl, requestInit] = makeRequestTuple(type, options);

  const response = await fetch(completeUrl, requestInit);

  if (!response.ok) {
    throw new Error(`Failed to request "${options.url}"`);
  }

  const {data} = await response.json();

  return data as RV;
};

export const buildUrl = (url: string, args: (string | number)[]): string => {
  return [url, ...args].join('/');
}
