import {StoreProductService} from "../../../modules/storeProduct/storeProduct.service";
import {app} from "../../../index";

export const makeStoreProductEndpoints = (): void => {
  const service = new StoreProductService();

  app.get('/store-products/revenue', (req, res) => {
    service
      .getStoreProductsRevenue()
      .then(response => {
        res.status(200).json({
          message: "All store products' revenue.",
          data: response,
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An unknown error occurred while getting all store products' revenue.",
          data: error,
        })
      })
  })

  app.get('/store-products/never-sold-by-employee/:employeeId', (req, res) => {
    const employeeId = Number(req.params.employeeId);

    service
      .getStoreProductsNeverSoldByEmployees(employeeId)
      .then(response => {
        res.status(200).json({
          message: `Store products never being sold by employee ${employeeId}`,
          data: response,
        })
      })
      .catch(error => {
        res.status(500).json({
          message: `An unknown error occurred while getting all store never being sold by employee ${employeeId}`,
          data: error,
        })
      })
  })

  app.get('/store-products/sold-and-non-promotional', (req, res) => {
    service
      .getAllNonPromotionalSoldStoreProducts()
      .then(response => {
        res.status(200).json({
          message: "Non promotional sold products.",
          data: response,
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An unknown error occurred while getting non promotional sold products.",
          data: error,
        })
      })
  })

  app.get('/store-products/sorted-by-amount', (req, res) => {
    service
      .getAllStoreProductsSortedByAmount()
      .then(response => {
        res.status(200).json({
          message: "Store products sorted by amount.",
          data: response,
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An unknown error occurred while getting store products sorted by amount.",
          data: error,
        })
      })
  })

  app.get('/store-products/by-category-name/:categoryName', (req, res) => {
    const {categoryName} = req.params;

    const service = new StoreProductService();

    service.getProductsByCategoryName(categoryName)
      .then(response => {
        res.status(200).json({
          message: "Products successfully retrieved.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while retrieving products.",
          error: error
        })
      })
  })

  app.get('/store-products/get-info/:upc', (req, res) => {
    const {upc} = req.params;

    service
      .findStoreProductInfoByUPC(upc)
      .then(response => {
        res.status(200).json({
          message: "Products info successfully retrieved.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while retrieving products info.",
          error: error
        })
      })
  })
}
