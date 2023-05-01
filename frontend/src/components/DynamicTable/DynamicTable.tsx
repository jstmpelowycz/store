// @ts-ignore
import React from 'react';
import {Container, Table} from 'react-bootstrap';

interface DynamicTableProps {
    columnNames: string[];
    records: any[][];
    tableName: string
}

const DynamicTable: React.FC<DynamicTableProps> = ({columnNames, records, tableName}) => {
    return (
        <Container fluid className="p-0">
            <h1>{tableName}</h1>
            <Table className="table-bordered table-striped w-100 full-width-table">
                <thead>
                <tr>
                    {columnNames.map((columnName, index) => (
                        <th key={index} scope="col">
                            {columnName}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {records.map((record, rowIndex) => (
                    <tr key={rowIndex}>
                        {record.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DynamicTable;
