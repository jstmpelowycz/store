import {app} from "../../../index";
import {EmployeeService} from "../../../modules/employee/employee.service";

export const employeeServiceEndpoints = (): void => {

    const service = new EmployeeService();

    app.post('employee/login', (req, res) => {
        const { email, password } = req.body;
        service.isEmailRegistered(email)
            .then(response => {
                if (response) {
                    res.status(200);
                } else {
                    res.status(300);
                }
            })
    })

}