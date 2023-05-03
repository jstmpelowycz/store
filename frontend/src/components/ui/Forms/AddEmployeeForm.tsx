import {ChangeEvent, FormEvent, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {employeeControllers} from "../../../controllers/employee.controllers";
import {CreateEmployeeFields, EmployeeRole} from "../../../typings/entities/employee.typedefs";

const AddEmployeeForm = () => {
    const [employee, setEmployee] = useState<CreateEmployeeFields>({
        password: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        email: '',
        birth_date: '',
        employment_date: '',
        role: EmployeeRole.Cashier,
        salary: 0,
        phone_number: '',
        city: '',
        street: '',
        zip_code: ''
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        // Format the date string as yyyy-MM-dd
        if (name === 'birth_date' || name === 'employment_date') {
            const date = new Date(value);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            // Update the state with the formatted date string
            setEmployee({ ...employee, [name]: formattedDate });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await employeeControllers.create({
            fields: {
                ...employee,
            }
        }).catch(console.log)
        console.log('Employee data:', employee);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" name="first_name" value={employee.first_name} onChange={handleInputChange} required/>
            </label>
            <label>
                Last Name:
                <input type="text" name="last_name" value={employee.last_name} onChange={handleInputChange} required/>
            </label>
            <label>
                Patronymic:
                <input type="text" name="patronymic" value={employee.patronymic} onChange={handleInputChange}/>
            </label>
            <label>
                Email:
                <input type="email" name="email" value={employee.email} onChange={handleInputChange} required/>
            </label>
            <label>
                Password:
                <input type="password" name="password" value={employee.password} onChange={handleInputChange} required/>
            </label>
            <label>
                Role:
                <select name="role" value={employee.role} onChange={handleInputChange} required>
                    <option value="">Select role</option>
                    <option value="MANAGER">Manager</option>
                    <option value="CASHIER">Cashier</option>
                </select>
            </label>
            <label>
                Salary:
                <input type="number" name="salary" value={employee.salary} onChange={handleInputChange} step="0.0001"/>
            </label>
            <label>
                Birth_date:
                <input type="date" name="birth_date" value={employee.birth_date} onChange={handleInputChange} required/>
            </label>
            <label>
                Employment_date:
                <input type="date" name="employment_date" value={employee.employment_date} onChange={handleInputChange} required/>
            </label>
            <label>
                Phone Number:
                <input type="text" name="phone_number" value={employee.phone_number} onChange={handleInputChange}
                       required/>
            </label>
            <label>
                City:
                <input type="text" name="city" value={employee.city} onChange={handleInputChange} required/>
            </label>
            <label>
                Street:
                <input type="text" name="street" value={employee.street} onChange={handleInputChange} required/>
            </label>
            <label>
                Zip Code:
                <input type="text" name="zip_code" value={employee.zip_code} onChange={handleInputChange} required/>
            </label>
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default AddEmployeeForm;
