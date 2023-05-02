import {useEffect, useState} from "react";
// @ts-ignore
import {DynamicTable} from "../DynamicTable/DynamicTable.tsx";
// @ts-ignore
import {getCustomerCards} from "../../hooks/getCustomerCards.ts";

export const CustomerCardTable = () => {
    const [columnNames, setColumnNames] = useState<string[]>([]);
    const [records, setRecords] = useState([])

    useEffect(() => {
        getCustomerCards().then((data: any[]) => {
            const columnNames = Object.keys(data[0]);
            const records = data.map(employee => Object.values(employee));

            setColumnNames(columnNames);
            setRecords(records);
        });
    }, []);

    return (
        <DynamicTable
            columnNames={columnNames}
            records={records}
            tableName='Customer Cards'
        />
    )
};
