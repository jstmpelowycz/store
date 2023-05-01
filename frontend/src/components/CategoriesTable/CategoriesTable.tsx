import {FC, useEffect, useState} from "react";
// @ts-ignore
import {getCategories} from "../../hooks/getCategories.ts";
// @ts-ignore
import {DynamicTable} from "../DynamicTable/DynamicTable.tsx";

export const CategoriesTable: FC = () => {
  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [records, setRecords] = useState([])

  useEffect(() => {
    getCategories().then((data) => {
      const columnNames = Object.keys(data[0]);
      const records = data.map(employee => Object.values(employee));

      setColumnNames(columnNames);
      setRecords(records);
    })
  }, [])

  if (!columnNames.length || !records.length) {
    return <h1>Wait...</h1>;
  }

  return (
    <DynamicTable
      columnNames={columnNames}
      records={records}
      tableName='Categories'
    />
  )
}
