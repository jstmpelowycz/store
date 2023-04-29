import {app} from "../../index";
import {employeeEndpoints} from "./employeeEndpoints";
import {categoryEndpoints} from "./categoryEndpoints";
import {productEndpoints} from "./productEndpoints";

export const initEndpoints = (): void => {
    employeeEndpoints();
    categoryEndpoints();
    productEndpoints();
};
