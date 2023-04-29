import {CategoryRepository} from "../../modules/category/category.repository";
import {app} from "../../index";

export const categoryEndpoints = (): void => {
    const repository = new CategoryRepository();

    app.get('/categories', (req, res) => {
        repository.findAll()
            .then(response => {
                res.json({
                    data: response
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occurred while fetching categories.',
                    error: error
                })
            })
    })

    app.post('/categories', (req, res) => {
        const { name } = req.body;
        repository
            .create(name)
            .then(response => {
                res.json({
                    message: "Category added successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.json({
                    message: "An error occurred while creating category.",
                    error: error
                })
            })
    })

    app.put('/categories/:id', (req, res) => {
        const id= Number(req.params.id);
        const { name } = req.body
        repository
            .updateById(id, name)
            .then(response => {
                res.json({
                    message: "Employee updated successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.json({
                    message: "An error occurred while updating employee.",
                    error: error
                })
            })
    })

    app.delete('/categories/:id', (req, res) => {
        const id = Number(req.params.id);
        repository
            .destroyById(id)
            .then(response => {
                res.json({
                    message: "Category deleted successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.json({
                    message: "An error occurred while deleting category.",
                    error: error
                })
            })
    })

}