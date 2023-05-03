import {
  CreateCustomerCardFields,
  CustomerCard,
  UpdateCustomerCardFields
} from "../typings/entities/customerCard.typedefs";
import {RF} from "../helpers/requests/requests.typedefs";
import {buildUrl, makeRequest} from "../helpers/requests/requests.factory";
import {REQUEST_URLS, RequestType} from "../helpers/requests/requests.constants";

interface CreateCustomerCardArgs {
  fields: CreateCustomerCardFields;
}

interface UpdateCustomerCardArgs {
  id: CustomerCard['id'];
  fields: UpdateCustomerCardFields;
}

const getAll: RF<CustomerCard[]> = async () => {
  return makeRequest(RequestType.Get, {
    url: REQUEST_URLS.customerCards,
  });
};

const create: RF<CustomerCard> = async (args: CreateCustomerCardArgs) => {
  return makeRequest(RequestType.Post, {
    url: REQUEST_URLS.customerCards,
    body: args.fields,
  });
};

const update: RF<CustomerCard> = async (args: UpdateCustomerCardArgs) => {
  return makeRequest(RequestType.Put, {
    url: buildUrl(REQUEST_URLS.customerCards, [args.id]),
    body: args.fields,
  });
};

const destroy: RF = async (id: CustomerCard['id']) => {
  return makeRequest(RequestType.Delete, {
    url: buildUrl(REQUEST_URLS.customerCards, [id]),
  });
};

export const customerCardControllers = {
  getAll,
  create,
  update,
  destroy,
};
