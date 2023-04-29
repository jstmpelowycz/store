import {app} from "../../index";
import {employeeEndpoints} from "./employeeEndpoints";
import {categoryEndpoints} from "./categoryEndpoints";
import {productEndpoints} from "./productEndpoints";
import {storeProductEndpoints} from "./storeProductEndpoints";
import {saleEndpoints} from "./saleEndpoints";
import {invoiceEndpoints} from "./invoiceEndpoints";
import {customerCardEndpoints} from "./customerCardEndpoints";

export const initEndpoints = (): void => {
    employeeEndpoints();
    categoryEndpoints();
    productEndpoints();
    storeProductEndpoints();
    saleEndpoints();
    invoiceEndpoints();
    customerCardEndpoints()
};
