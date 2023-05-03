import {RF} from "../helpers/requests/requests.typedefs";
import {CreateProductFields, Product, UpdateProductFields} from "../typings/entities/product.typedefs";
import {buildUrl, makeRequest} from "../helpers/requests/requests.factory";
import {REQUEST_URLS, RequestType} from "../helpers/requests/requests.constants";

interface CreateProductArgs {
  fields: CreateProductFields;
}

interface UpdateProductArgs {
  id: Product['id'];
  fields: UpdateProductFields;
}

const getAll: RF<Product[]> = async () => {
  return makeRequest<Product[]>(RequestType.Get, {
    url: REQUEST_URLS.products,
  });
};

const create: RF<Product> = async (args: CreateProductArgs) => {
  return makeRequest(RequestType.Post, {
    url: REQUEST_URLS.products,
    body: args.fields,
  });
};

const update: RF<Product> = async (args: UpdateProductArgs) => {
  return makeRequest(RequestType.Put, {
    url: buildUrl(REQUEST_URLS.products, [args.id]),
    body: args.fields,
  });
};

const destroy: RF = async (id: Product['id']) => {
  return makeRequest(RequestType.Delete, {
    url: buildUrl(REQUEST_URLS.products, [id]),
  });
};

export const productControllers = {
  getAll,
  create,
  update,
  destroy,
};
