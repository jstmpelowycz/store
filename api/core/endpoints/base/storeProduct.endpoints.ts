import {app} from "../../../index";
import {StoreProductRepository} from "../../../modules/storeProduct/storeProduct.repository";

export const makeStoreProductBaseEndpoints = (): void => {
  const repository = new StoreProductRepository();

  app.get('/store-products', (req, res) => {
    repository.findAll()
      .then(response => {
        res.status(200).json({
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred while fetching store products.',
          error: error
        })
      })
  })

  app.post('/store-products', (req, res) => {
    const {
      upc_prom,
      selling_price,
      amount,
      is_promotional,
      product_id,
    } = req.body;

    repository
      .create({
        upc_prom: upc_prom,
        selling_price: selling_price,
        amount: amount,
        is_promotional: is_promotional,
        product_id: product_id,
      })
      .then(response => {
        res.status(200).json({
          message: "Store product added successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while creating store product.",
          error: error
        })
      })
  })

  app.put('/store-products/:upc', (req, res) => {
    const {upc} = req.params;

    const {
      upc_prom,
      selling_price,
      amount,
      is_promotional,
      product_id,
    } = req.body

    repository
      .updateByUpc(upc, {
        upc_prom: upc_prom,
        selling_price: selling_price,
        amount: amount,
        is_promotional: is_promotional,
        product_id: product_id
      })
      .then(response => {
        res.status(200).json({
          message: "Store product updated successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while updating store product.",
          error: error
        })
      })
  })

  app.delete('/store-products/:upc', (req, res) => {
    const {upc} = req.params;

    repository
      .destroyByUpc(upc)
      .then(response => {
        res.status(200).json({
          message: "Store product deleted successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while deleting store product.",
          error: error
        })
      })
  })
}
