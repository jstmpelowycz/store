import {FC, useEffect, useState} from "react";
// @ts-ignore
import {DynamicTable} from "../DynamicTable/DynamicTable.tsx";
// @ts-ignore
import {getProducts} from "../../hooks/getProducts.ts";

export const ProductsTable: FC = () => {
    const [columnNames, setColumnNames] = useState<string[]>([]);
    const [records, setRecords] = useState([])

    useEffect(() => {
        getProducts().then((data) => {
            const columnNames = Object.keys(data[0]);
            const records = data.map(employee => Object.values(employee));
            console.log(data);
            setColumnNames(columnNames);
            setRecords(records);
        })
    }, [])

    return (
        <DynamicTable
            columnNames={columnNames}
            records={records}
            tableName='Products'
        />
    )
}