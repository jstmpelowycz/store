import {app} from "../../../index";
import {ProductRepository} from "../../../modules/product/product.repository";
import {StoreProductService} from "../../../modules/storeProduct/storeProduct.service";

export const makeProductBaseEndpoints = (): void => {
  const repository = new ProductRepository();

  app.get('/products', (req, res) => {
    repository.findAll()
      .then(response => {
        res.status(200).json({
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred while fetching products.',
          error: error
        })
      })
  })

  app.post('/products', (req, res) => {
    const {name, description, category_id} = req.body;

    repository
      .create({
        name: name,
        description: description,
        category_id: category_id
      })
      .then(response => {
        res.status(200).json({
          message: "Product added successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while creating product.",
          error: error
        })
      })
  })

  app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const {name, description} = req.body

    repository
      .updateById(id, {
        name: name,
        description: description
      })
      .then(response => {
        res.status(200).json({
          message: "Product updated successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while updating product.",
          error: error
        })
      })
  });

  app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id);

    repository
      .destroyById(id)
      .then(response => {
        res.status(200).json({
          message: "Product deleted successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while deleting product.",
          error: error
        })
      })
  });
}
