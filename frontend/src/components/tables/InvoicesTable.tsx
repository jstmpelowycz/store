import {FC} from "react";
import {Table} from "../ui/Table/Table";
import {invoiceControllers} from "../../controllers/invoice.controllers";

export const InvoicesTable: FC = () => {
  return (
    <Table
      name="Invoices"
      onMount={invoiceControllers.getAll}
      onDelete={invoiceControllers.destroy}
    />
  );
}
