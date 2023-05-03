import {Invoice} from "../typings/entities/invoice.typedefs";
import {RF} from "../helpers/requests/requests.typedefs";
import {buildUrl, makeRequest} from "../helpers/requests/requests.factory";
import {REQUEST_URLS, RequestType} from "../helpers/requests/requests.constants";

interface GetAllByPeriodArgs {
  startAt: string;
  endAt: string;
}

interface GetAllByCashierAndPeriodArgs extends GetAllByPeriodArgs {
  cashierLastName: string;
}

const getAll: RF<Invoice[]> = async () => {
  return makeRequest(RequestType.Get, {
    url: REQUEST_URLS.invoices.default,
  });
};

const destroy: RF = async (id: Invoice['id']) => {
  return makeRequest(RequestType.Delete, {
    url: buildUrl(REQUEST_URLS.invoices.default, [id]),
  });
};

const getAllByPeriod: RF<Invoice[]> = async (
  args: GetAllByPeriodArgs
) => {
  return makeRequest(RequestType.Get, {
    url: buildUrl(REQUEST_URLS.invoices.byPeriod, [
      args.startAt,
      args.endAt,
    ]),
  });
};

const getAllByCashierAndPeriod: RF<Invoice[]> = async (
  args: GetAllByCashierAndPeriodArgs
) => {
  return makeRequest(RequestType.Get, {
    url: buildUrl(REQUEST_URLS.invoices.byCashierAndPeriod, [
      args.cashierLastName,
      args.startAt,
      args.endAt,
    ]),
  });
};

export const invoiceControllers = {
  getAll,
  getAllByPeriod,
  getAllByCashierAndPeriod,
  destroy,
};
