import {app} from "../../../index";
import {CustomerCardRepository} from "../../../modules/customerCard/customerCard.repository";

export const makeCustomerCardBaseEndpoints = (): void => {
  const repository = new CustomerCardRepository();

  app.get('/customer-cards', (req, res) => {
    repository.findAll()
      .then(response => {
        res.status(200).json({
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred while fetching customer cards.',
          error: error
        })
      })
  })

  app.post('/customer-cards', (req, res) => {
    const {
      id,
      customer_last_name,
      customer_first_name,
      customer_patronymic,
      phone_number,
      city,
      street,
      zip_code,
      percent,
    } = req.body
    repository
      .create({
        id: id,
        customer_first_name: customer_first_name,
        customer_last_name: customer_last_name,
        customer_patronymic: customer_patronymic,
        phone_number: phone_number,
        city: city,
        street: street,
        zip_code: zip_code,
        percent: percent,
      })
      .then(response => {
        res.status(200).json({
          message: "Customer card added successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while creating customer card.",
          error: error
        })
      })
  })

  app.put('/customer-cards/:id', (req, res) => {
    const {id} = req.params;
    const {
      customer_last_name,
      customer_first_name,
      customer_patronymic,
      phone_number,
      city,
      street,
      zip_code,
      percent,
    } = req.body
    repository
      .updateById(id, {
        customer_last_name: customer_last_name,
        customer_first_name: customer_first_name,
        customer_patronymic: customer_patronymic,
        phone_number: phone_number,
        city: city,
        street: street,
        zip_code: zip_code,
        percent: percent,
      })
      .then(response => {
        res.status(200).json({
          message: "Customer card updated successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while customer card.",
          error: error
        })
      })
  })

  app.delete('/customer-cards/:id', (req, res) => {
    const {id} = req.params;
    repository
      .destroyById(id)
      .then(response => {
        res.status(200).json({
          message: "Customer card deleted successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred while deleting customer card.",
          error: error
        })
      })
  })
}
