// @ts-ignore
import React, {FC} from 'react';
// @ts-ignore
import {getEmployees} from "../../hooks/getEmployees.ts";
// @ts-ignore
import {DynamicTable} from "../DynamicTable/DynamicTable.tsx";
// @ts-ignore
import {useAppContext} from "../../context/AppContext.tsx";
// @ts-ignore
import {EmployeesTable} from "../EmployeesTable/EmployeesTable.tsx";
// @ts-ignore
import {CategoriesTable} from "../CategoriesTable/CategoriesTable.tsx";

export const HomePage: FC = () => {
  return (
    <>
      <EmployeesTable/>
      <CategoriesTable/>
    </>
  )
};
