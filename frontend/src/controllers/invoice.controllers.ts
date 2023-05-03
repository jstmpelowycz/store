import {Invoice} from "../typings/entities/invoice.typedefs";
import {RF} from "../helpers/requests/requests.typedefs";
import {buildUrl, makeRequest} from "../helpers/requests/requests.factory";
import {REQUEST_URLS, RequestType} from "../helpers/requests/requests.constants";

const getAll: RF<Invoice[]> = async () => {
  return makeRequest(RequestType.Get, {
    url: REQUEST_URLS.invoices,
  });
};

const destroy: RF = async (id: Invoice['id']) => {
  return makeRequest(RequestType.Delete, {
    url: buildUrl(REQUEST_URLS.invoices, [id]),
  });
};

export const invoiceControllers = {
  getAll,
  destroy,
};
