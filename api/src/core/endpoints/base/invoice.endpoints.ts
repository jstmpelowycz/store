import {app} from "../../../index";
import {InvoiceRepository} from "../../../modules/invoice/invoice.repository";

export const makeInvoiceBaseEndpoints = (): void => {
  const repository = new InvoiceRepository();

  app.get('/invoices', (req, res) => {
    repository.findAll()
      .then(response => {
        res.status(200).json({
          data: response,
        })
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred while fetching invoices.',
          error: error
        })
      })
  })

  app.post('/invoices', (req, res) => {
    const {
      id,
      employee_id,
      card_id,
      print_date,
      total,
    } = req.body;
    repository
      .create({
        id: id,
        employee_id: employee_id,
        card_id: card_id,
        print_date: print_date,
        total: total,
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

  app.delete('/invoices/:id', (req, res) => {
    const {id} = req.params;
    repository
      .destroyById(id)
      .then(response => {
        res.status(200).json({
          message: "Invoice deleted successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while deleting invoice.",
          error: error
        })
      })
  })
}
