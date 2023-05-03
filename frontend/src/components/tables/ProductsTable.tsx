import {FC} from "react";
import {productControllers} from "../../controllers/product.controllers";
import {Table} from "../ui/Table/Table";

export const ProductsTable: FC = () => {
  return (
    <Table
      name='Products'
      onMount={productControllers.getAll}
      onDelete={productControllers.destroy}
    />
  );
}
