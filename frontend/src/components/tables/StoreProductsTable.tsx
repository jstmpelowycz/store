import {FC} from "react";
import {storeProductControllers} from "../../controllers/storeProduct.controllers";
import {Table} from "../ui/Table/Table";

export const StoreProductsTable: FC = () => {
  return (
    <Table name='Products' onMount={storeProductControllers.getAll}/>
  );
}
