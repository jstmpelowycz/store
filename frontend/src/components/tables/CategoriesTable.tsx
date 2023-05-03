import {FC} from "react";
import {Table} from "../ui/Table/Table";
import {categoryControllers} from "../../controllers/category.controllers";

export const CategoriesTable: FC = () => {
  return (
    <Table
      name="Categories"
      onMount={categoryControllers.getAll}
    />
  );
};
