import {SalesService} from "../../../modules/sales/sales.service";
import {app} from "../../../index";

export const makeSalesEndpoints = (): void => {
  const service = new SalesService();

  app.post('/sales/create-and-apply-promo/', (req, res) => {
    const {store_product_upc, invoice_id, amount} = req.body
    service
      .createAndApplyPromotion({
        store_product_upc: store_product_upc,
        invoice_id: invoice_id,
        amount: amount,
      })
      .then(response => {
        res.status(200).json({
          message: "Sale created successfully.",
          data: response,
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "Stored amount is smaller than requested.",
          data: error,
        })
      });
  })
}
