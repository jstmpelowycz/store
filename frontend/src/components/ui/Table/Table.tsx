import {useEffect, useState} from "react";
import {RF} from "../../../helpers/requests/requests.typedefs";
import {AnyObject, TableRecord} from "../../../typings/typedefs";
import {parseColumnNames, parseRecords} from "./Table.helpers";
import {DynamicTable} from "../DynamicTable/DynamicTable";
import {isArrayEmpty} from "../../../helpers/functional";
import {Placeholder} from "../Placeholder/Placeholder";

interface Props<E extends AnyObject> {
  name: string;
  onMount: RF<E[]>;
}

export function Table<E extends AnyObject>(props: Props<E>) {
  const {name, onMount} = props;

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

  if (isArrayEmpty(columnNames) || isArrayEmpty(records)) {
    return <Placeholder/>;
  }

  return (
    <DynamicTable
      tableName={name}
      columnNames={columnNames}
      records={records}
    />
  );
}
