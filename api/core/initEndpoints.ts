import {app} from "../index";
import {employeeRepoEndpoints} from "./endpoints/repo/employeeRepoEndpoints";
import {categoryRepoEndpoints} from "./endpoints/repo/categoryRepoEndpoints";
import {productRepoEndpoints} from "./endpoints/repo/productRepoEndpoints";
import {storeProductRepoEndpoints} from "./endpoints/repo/storeProductRepoEndpoints";
import {saleRepoEndpoints} from "./endpoints/repo/saleRepoEndpoints";
import {invoiceRepoEndpoints} from "./endpoints/repo/invoiceRepoEndpoints";
import {customerCardRepoEndpoints} from "./endpoints/repo/customerCardRepoEndpoints";
import {employeeServiceEndpoints} from "./endpoints/service/employeeServiceEndpoints";

export const initEndpoints = (): void => {
    employeeRepoEndpoints();
    categoryRepoEndpoints();
    productRepoEndpoints();
    storeProductRepoEndpoints();
    saleRepoEndpoints();
    invoiceRepoEndpoints();
    customerCardRepoEndpoints()
    employeeServiceEndpoints();
};
