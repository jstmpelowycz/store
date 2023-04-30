import {CategoryService} from "../../../modules/category/category.service";
import {app} from "../../../index";
import {EmployeeRole} from "../../../modules/employee/employee.typedefs";

export const categoryServiceEndpoints = (): void => {
    const service = new CategoryService()

    app.get('category/products/total', (req, res) => {
        service
            .getCategoryProductsTotal()
            .then(response => {
                res.status(200).json({
                    message: "Total revenue of all categories' products.",
                    data: response,
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: "An unknown error occurred while getting categories' revenue.",
                    data: error,
                })
            });
    })

    app.get('category/products/sold-by-employee-role/:role', (req, res) => {
        const { role } = req.params;
        const employeeRole = EmployeeRole[role as keyof typeof EmployeeRole];
        service
            .getProductsTotalSoldByEmployeeRole(employeeRole)
            .then(response => {
                res.status(200).json({
                    message: `Total revenue of products that were sole by employee with role ${role}`,
                    data: response,
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: `An unknown error occurred while getting revenue of sold products by employee with role ${role}`,
                    data: error,
                })
            })
    })
}