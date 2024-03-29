import React, {useState} from 'react';
// @ts-ignore
import {EmployeesTable} from '../../tables/EmployeesTable';
// @ts-ignore
import AddEmployeeForm from '../../ui/Forms/AddEmployeeForm';
// import {useIsManager} from "../../hooks/useIsManager"; // Import the AddEmployeeForm component


export const EmployeesPage: React.FC = () => {
    const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
    // const isManager = useIsManager();

    const toggleAddEmployeeForm = () => {
        setShowAddEmployeeForm(!showAddEmployeeForm);
    };

    return (


        <>
            <button onClick={toggleAddEmployeeForm}>
                {showAddEmployeeForm ? 'Hide Add Employee Form' : 'Add Employee'}
            </button>
            {showAddEmployeeForm && <AddEmployeeForm/>}
            <EmployeesTable/>
        </>

    );
};

