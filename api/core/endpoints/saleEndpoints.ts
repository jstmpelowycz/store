import {StoreProductRepository} from "../../modules/storeProduct/storeProduct.repository";
import {app} from "../../index";
import {SalesRepository} from "../../modules/sales/sales.repository";

export const saleEndpoints = (): void => {
    const repository = new SalesRepository();

    app.get('/sales', (req, res) => {
        repository.findAll()
            .then(response => {
                res.json({
                    data: response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occurred while fetching sales.',
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
                res.json({
                    message: "Sale added successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.json({
                    message: "An error occurred while creating sale.",
                    error: error
                })
            })
    })

    app.delete('/sales/:store_product_upc/:invoice_id', (req, res) => {
        const { store_product_upc, invoice_id } = req.params;
        repository
            .destroyByInvoiceIdAndUpc(store_product_upc, invoice_id)
            .then(response => {
                res.json({
                    message: "Sale deleted successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.json({
                    message: "An error occurred while deleting sale.",
                    error: error
                })
            })
    })
}