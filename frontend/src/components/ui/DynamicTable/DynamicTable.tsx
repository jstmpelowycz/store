import {FC, MouseEvent} from 'react';
import {Container, Table} from 'react-bootstrap';
import {AnyFunction} from "../../../typings/typedefs";

interface Props {
  columnNames: string[];
  records: any[][];
  tableName: string
  onDelete: AnyFunction;
}

export const DynamicTable: FC<Props> = (props) => {
  const {columnNames, records, tableName, onDelete} = props;

  const handleRowClick = async (identifier: any) => {
    // eslint-disable-next-line
    if (window.confirm('Delete?')) {
      await onDelete(identifier);
    }
  }

  return (
    <Container fluid className="p-0">
      <h1>{tableName}</h1>
      <Table
        className="table-bordered table-striped w-100 full-width-table"
        data-printable
      >
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
          <tr
            key={rowIndex}
            onContextMenu={async (event: MouseEvent<HTMLTableRowElement>) => {
              event.preventDefault();
              event.stopPropagation();

              await handleRowClick(record[0]);
            }}>
            {record.map((cell, cellIndex) => (
              <td key={cellIndex}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </Table>
    </Container>
  );
};
