import {app} from "../../../index";
import {InvoiceService} from "../../../modules/invoice/invoice.service";

export const makeInvoiceEndpoints = (): void => {
  const service = new InvoiceService();

  app.get('/invoices/by-cashier-and-period/:cashierLastName/:start/:end/', (req, res) => {
    const {cashierLastName, start, end} = req.params;

    service.findAllByCashierAndPeriod(cashierLastName, start, end)
      .then(response => {
      res.status(200).json({
        message: "Found invoices by cashier last name and period successfully.",
        data: response
      })
    })
      .catch(error => {
        res.status(401).json({
          message: "Cannot find invoices by cashier last name and period.",
          data: error,
        })
      })
  });

  app.get('/invoices/by-period/:start/:end/', (req, res) => {
    const {start, end} = req.params;

    service.findAllInvoicesByPeriod(start, end)
      .then(response => {
        res.status(200).json({
          message: "Found invoices by cashier last name and period successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(401).json({
          message: "Cannot find invoices by cashier last name and period.",
          data: error,
        })
      })
  });
};
