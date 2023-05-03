import {app} from "../../../index";
import {EmployeeService} from "../../../modules/employee/employee.service";
import {filterPassword} from "../base/employee.endpoints";

export const makeEmployeeEndpoints = (): void => {
  const service = new EmployeeService();

  app.post('/employee/login', (req, res) => {
    const {email, password} = req.body;

    service
      .validateLogInPossible(email)
      .then(() => {
        console.log("Log in is possible. Proceeding to log in.")
      })
      .catch(error => {
        res.status(401).json({
          message: "Log in attempt is not possible. Email is not registered.",
          data: error,
        })
      });

    service
      .validateLogInSucceededAndReturnEmployee(email, password)
      .then(response => {
        res.status(200).json({
          message: "Log in succeeded.",
          data: filterPassword(response),
        })
      })
      .catch(error => {
        res.status(401).json({
          message: "Log in failed. Email or password is wrong.",
          data: error,
        })
      })
  })

  app.post('/employee/signup', (req, res) => {
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
      birth_date,
      employment_date,
    } = req.body;

    service
      .validateSignUpPossible(email)
      .then(() => {
        console.log("Proceeding to sign up.")
      })
      .catch(error => {
        res.status(401).json({
          message: "Sign up attempt is not possible. Email is registered.",
          data: error,
        })
      });

    service
      .createWithEncodedPassword({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        patronymic: patronymic,
        role: role,
        salary: Number(salary),
        phone_number: phone_number,
        city: city,
        street: street,
        zip_code: zip_code,
        birth_date: birth_date,
        employment_date: employment_date
      })
      .then(response => {
        res.status(200).json({
          message: "Sign up is succeeded.",
          data: response
        })
      })
      .catch(error => {
        res.status(401).json({
          message: "Sign up attempt failed",
          data: error,
        })
      })
  })

  app.get('/employee/contacts/:lastName', (req, res) => {
    const {lastName} = req.params;

    service.getEmployeesPhoneNumberAndAddressByLastName(lastName)
      .then(response => {
        res.status(200).json({
          message: "Found employee by last name successfully.",
          data: response
        })
      })
      .catch(error => {
        res.status(401).json({
          message: "Cannot find employee by last name",
          data: error,
        })
      })
  })
}
