import {app} from "../../../index";
import {CustomerCardService} from "../../../modules/customerCard/customerCard.service";

export const makeCustomerCardEndpoints = (): void => {
  const service = new CustomerCardService();

  app.get('/customer-cards/:percent', (req, res) => {
    const {percent} = req.params;

    service
      .getCustomerCardsByPercent(Number(percent))
      .then(response => {
      res.status(200).json({
        message: "Found customer cards by percent.",
        data: response
      })
    })
      .catch(error => {
        res.status(401).json({
          message: "Cannot find customer cards by percent.",
          data: error,
        })
      })
  });
};
