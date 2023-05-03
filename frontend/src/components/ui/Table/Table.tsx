import {useEffect, useState} from "react";
import {RF} from "../../../helpers/requests/requests.typedefs";
import {AnyFunction, AnyObject, TableRecord} from "../../../typings/typedefs";
import {parseColumnNames, parseRecords} from "./Table.helpers";
import {DynamicTable} from "../DynamicTable/DynamicTable";
import {isArrayEmpty} from "../../../helpers/functional";
import {Placeholder} from "../Placeholder/Placeholder";
import {FloatingButton} from "../FloatingButton/FloatingButton";
import {pdfClient} from "../../../print/pdfClient";

interface Props<E extends AnyObject> {
  name: string;
  onMount: RF<E[]>;
  onDelete: AnyFunction;
}

export function Table<E extends AnyObject>(props: Props<E>) {
  const {name, onMount, onDelete} = props;

  const [columnNames, setColumnNames] = useState<string[]>([]);
  const [records, setRecords] = useState<TableRecord[]>([]);

  useEffect(() => {
    onMount().then((entities) => {
      if (!isArrayEmpty(entities)) {
        setColumnNames(parseColumnNames(entities));
        setRecords(parseRecords(entities));
      }
    });
  }, []);

  const handleSaveTable = async () => {
    await pdfClient.saveAsPdf(name);
  };

  if (isArrayEmpty(columnNames) || isArrayEmpty(records)) {
    return <Placeholder/>;
  }

  return (
    <>
      <DynamicTable
        tableName={name}
        columnNames={columnNames}
        records={records}
        onDelete={onDelete}
      />
      <FloatingButton
        title="Save"
        onClick={handleSaveTable}
      />
    </>
  );
}
