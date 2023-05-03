import {
  CreateStoreProductFields,
  StoreProduct,
  StoreProductInfo,
  UpdateStoreProductFields
} from "../typings/entities/storeProduct.typedefs";
import {buildUrl, makeRequest} from "../helpers/requests/requests.factory";
import {REQUEST_URLS, RequestType} from "../helpers/requests/requests.constants";
import {RF} from "../helpers/requests/requests.typedefs";

interface CreateStoreProductArgs {
  fields: CreateStoreProductFields;
}

interface UpdateStoreProductArgs {
  upc: StoreProduct['upc'];
  fields: UpdateStoreProductFields;
}

const getAll: RF<StoreProduct[]> = async () => {
  return makeRequest(RequestType.Get, {
    url: REQUEST_URLS.storeProducts.default,
  });
};

const getAllSortedByAmount: RF<StoreProduct[]> = async () => {
  return makeRequest(RequestType.Get, {
    url: REQUEST_URLS.storeProducts.sortedByAmount,
  });
};

const getManyByCategoryName: RF<StoreProduct[]> = async (categoryName: string) => {
  return makeRequest(RequestType.Get, {
    url: buildUrl(REQUEST_URLS.storeProducts.byCategoryName, [categoryName]),
  });
};

const getInfo: RF<StoreProductInfo[]> = async (upc: StoreProduct['upc']) => {
  return makeRequest(RequestType.Get, {
    url: buildUrl(REQUEST_URLS.storeProducts.info, [upc]),
  });
};

const create: RF<StoreProduct> = async (args: CreateStoreProductArgs) => {
  return makeRequest(RequestType.Post, {
    url: REQUEST_URLS.storeProducts.default,
    body: args.fields,
  });
};

const update: RF<StoreProduct> = async (args: UpdateStoreProductArgs) => {
  return makeRequest(RequestType.Put, {
    url: buildUrl(REQUEST_URLS.storeProducts.default, [args.upc]),
    body: args.fields,
  });
};

const destroy: RF = async (upc: StoreProduct['upc']) => {
  return makeRequest(RequestType.Delete, {
    url: buildUrl(REQUEST_URLS.storeProducts.default, [upc]),
  });
};

export const storeProductControllers = {
  getAll,
  getInfo,
  getAllSortedByAmount,
  getManyByCategoryName,
  create,
  update,
  destroy,
};
