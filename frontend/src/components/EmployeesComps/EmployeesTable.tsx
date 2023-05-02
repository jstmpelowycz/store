// @ts-ignore
import {useAppContext} from "../../context/AppContext.tsx";
import {useEffect, useState} from "react";
// @ts-ignore
import {getEmployees} from "../../hooks/getEmployees.ts";
// @ts-ignore
import {DynamicTable} from "../DynamicTable/DynamicTable.tsx";

export const EmployeesTable = () => {
  const {currentEmployee} = useAppContext();
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [records, setRecords] = useState([])

  useEffect(() => {
    getEmployees(currentEmployee.id).then((data: any[]) => {
      const columnNames = Object.keys(data[0]);
      const records = data.map(employee => Object.values(employee));

      setColumnNames(columnNames);
      setRecords(records);
    });
  }, []);

  if (!columnNames.length || !records.length) {
    return <h1>Wait...</h1>;
  }

  return (
    <DynamicTable
      columnNames={columnNames}
      records={records}
      tableName='Employees'
    />
  )
};
