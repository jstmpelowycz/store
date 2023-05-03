import {FC} from "react";
import {Table} from "../ui/Table/Table";
import {employeeControllers} from "../../controllers/employee.controllers";

export const EmployeesTable: FC = () => {
  return (
    <Table
      name="Employees"
      onMount={employeeControllers.getAll}
    />
  );
};
