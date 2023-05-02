import {FC, useEffect, useState} from "react";
// @ts-ignore
import {DynamicTable} from "../DynamicTable/DynamicTable.tsx";
// @ts-ignore
import {getStoreProducts} from "../../hooks/getStoreProducts.ts";

export const StoreProductsTable: FC = () => {
    const [columnNames, setColumnNames] = useState<string[]>([]);
    const [records, setRecords] = useState([])

    useEffect(() => {
        getStoreProducts().then((data) => {
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