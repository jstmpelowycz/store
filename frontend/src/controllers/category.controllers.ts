import {RF} from "../helpers/requests/requests.typedefs";
import {Category, CreateCategoryFields, UpdateCategoryFields} from "../typings/entities/category.typedefs";
import {buildUrl, makeRequest} from "../helpers/requests/requests.factory";
import {REQUEST_URLS, RequestType} from "../helpers/requests/requests.constants";

interface CreateCategoryArgs {
  fields: CreateCategoryFields;
}

interface UpdateCategoryArgs {
  id: Category['id'];
  fields: UpdateCategoryFields;
}

const getAll: RF<Category[]> = async () => {
  return makeRequest(RequestType.Get, {
    url: REQUEST_URLS.categories,
  });
};

const create: RF<Category> = async (args: CreateCategoryArgs) => {
  return makeRequest(RequestType.Post, {
    url: REQUEST_URLS.categories,
    body: args.fields,
  });
};

const update: RF<Category> = async (args: UpdateCategoryArgs) => {
  return makeRequest(RequestType.Put, {
    url: buildUrl(REQUEST_URLS.categories, [args.id]),
    body: args.fields,
  });
};

const destroy: RF = async (id: Category['id']) => {
  return makeRequest(RequestType.Delete, {
    url: buildUrl(REQUEST_URLS.categories, [id]),
  });
};

export const categoryControllers = {
  getAll,
  create,
  update,
  destroy,
};
