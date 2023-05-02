import {app} from "../../../index";
import {SalesRepository} from "../../../modules/sales/sales.repository";

export const makeSaleBaseEndpoints = (): void => {
  const repository = new SalesRepository();

  app.get('/sales', (req, res) => {
    repository.findAll()
      .then(response => {
        res.status(200).json({
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred while fetching sales.',
          error: error
        })
      })
  })

  app.get('/sales/:invoice_id', (req, res) => {
    const {invoice_id} = req.params;
    repository.findByInvoiceId(invoice_id)
        .then(response => {
          res.status(200).json({
            data: response
          })
        })
        .catch(error => {
          res.status(500).json({
            message: `An error occurred while fetching sales by invoice id ${invoice_id}.`,
            error: error
          })
        })
  })

  app.post('/sales', (req, res) => {
    const {
      store_product_upc,
      invoice_id,
      amount,
      selling_price,
    } = req.body;

    repository
      .create({
        store_product_upc: store_product_upc,
        invoice_id: invoice_id,
        selling_price: selling_price,
        amount: amount,
      })
      .then(response => {
        res.status(200).json({
          message: "Sale added successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while creating sale.",
          error: error
        })
      })
  })

  app.delete('/sales/:store_product_upc/:invoice_id', (req, res) => {
    const {store_product_upc, invoice_id} = req.params;

    repository
      .destroyByInvoiceIdAndUpc(store_product_upc, invoice_id)
      .then(response => {
        res.status(200).json({
          message: "Sale deleted successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while deleting sale.",
          error: error
        })
      })
  })
}
