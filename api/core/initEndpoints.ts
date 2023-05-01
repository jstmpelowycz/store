import {makeEmployeeBaseEndpoints} from "./endpoints/repo/employee.endpoints";
import {makeCategoryBaseEndpoints} from "./endpoints/repo/category.endpoints";
import {makeProductBaseEndpoints} from "./endpoints/repo/product.endpoints";
import {makeStoreProductBaseEndpoints} from "./endpoints/repo/storeProduct.endpoints";
import {makeSaleBaseEndpoints} from "./endpoints/repo/sale.endpoints";
import {makeInvoiceBaseEndpoints} from "./endpoints/repo/invoice.endpoints";
import {makeCustomerCardBaseEndpoints} from "./endpoints/repo/customerCard.endpoints";
import {makeEmployeeEndpoints} from "./endpoints/service/employee.endpoints";
import {makeCategoryEndpoints} from "./endpoints/service/category.endpoitns";
import {makeSalesEndpoints} from "./endpoints/service/sales.endpoints";
import {makeStoreProductEndpoints} from "./endpoints/service/storeProduct.endpoints";

export const initEndpoints = (): void => {
    makeEmployeeBaseEndpoints();
    makeCategoryBaseEndpoints();
    makeProductBaseEndpoints();
    makeStoreProductBaseEndpoints();
    makeSaleBaseEndpoints();
    makeInvoiceBaseEndpoints();
    makeCustomerCardBaseEndpoints()

    makeCategoryEndpoints();
    makeEmployeeEndpoints();
    makeSalesEndpoints();
    makeStoreProductEndpoints();
};
