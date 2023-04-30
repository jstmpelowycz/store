import {app} from "../../../index";
import {EmployeeRepository} from "../../../modules/employee/employee.repository";

export const employeeRepoEndpoints = (): void => {
    const repository = new EmployeeRepository();

    app.get('/employees', (req, res) => {
        repository.findAll()
            .then(response => {
                res.status(200).json({
                    data: response
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: 'An error occurred while fetching employees.',
                    error: error
                })
            })
    })

    app.post('/employees', (req, res) => {
        const {
            email,
            password,
            first_name,
            last_name,
            patronymic,
            role,
            salary,
            phone_number,
            city,
            street,
            zip_code,
            employment_date,
            birth_date
        } = req.body
        repository
            .create({
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                patronymic: patronymic,
                role: role,
                salary: salary,
                phone_number: phone_number,
                city: city,
                street: street,
                zip_code: zip_code,
                employment_date: employment_date,
                birth_date: birth_date
            })
            .then(response => {
                res.status(200).json({
                    message: "Employee added successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: "An error occurred while creating employee.",
                    error: error
                })
            })
    })

    app.put('/employees/:id', (req, res) => {
        const id = Number(req.params.id);
        const {
            email,
            password,
            first_name,
            last_name,
            patronymic,
            role,
            salary,
            phone_number,
            city,
            street,
            zip_code,
        } = req.body
        repository
            .updateById(id, {
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                patronymic: patronymic,
                role: role,
                salary: salary,
                phone_number: phone_number,
                city: city,
                street: street,
                zip_code: zip_code,
            })
            .then(response => {
                res.status(200).json({
                    message: "Employee updated successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: "An error occurred while updating employee.",
                    error: error
                })
            })
    })

    app.delete('/employees/:id', (req, res) => {
        const id = Number(req.params.id);
        repository
            .destroyById(id)
            .then(response => {
                res.status(200).json({
                    message: "Employee deleted successfully.",
                    data: response
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: "An error occurred while deleting employee.",
                    error: error
                })
            })
    })

    app.get('/employees/:email', (req, res) => {
        const email = req.params.email;
        repository
            .getByEmail(email)
            .then(response => {
                res.status(200).json({
                    data: response
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: "An error occurred while fetching employee by email.",
                    error: error
                })
            })
    })
};