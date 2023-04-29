import {app} from "../index";
import {employeeEndpoints} from "./endpoints/employeeEndpoints";
import {categoryEndpoints} from "./endpoints/categoryEndpoints";
import {productEndpoints} from "./endpoints/productEndpoints";
import {storeProductEndpoints} from "./endpoints/storeProductEndpoints";
import {saleEndpoints} from "./endpoints/saleEndpoints";
import {invoiceEndpoints} from "./endpoints/invoiceEndpoints";
import {customerCardEndpoints} from "./endpoints/customerCardEndpoints";

export const initEndpoints = (): void => {
    employeeEndpoints();
    categoryEndpoints();
    productEndpoints();
    storeProductEndpoints();
    saleEndpoints();
    invoiceEndpoints();
    customerCardEndpoints()
};
