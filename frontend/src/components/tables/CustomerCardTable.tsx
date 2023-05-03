import {FC} from "react";
import {Table} from "../ui/Table/Table";
import {customerCardControllers} from "../../controllers/customerCard.controllers";

export const CustomerCardTable: FC = () => {
  return (
    <Table
      name="Customers cards"
      onMount={customerCardControllers.getAll}
      onDelete={customerCardControllers.destroy}
    />
  );
};
