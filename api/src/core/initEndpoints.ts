import {makeEmployeeBaseEndpoints} from "./endpoints/base/employee.endpoints";
import {makeCategoryBaseEndpoints} from "./endpoints/base/category.endpoints";
import {makeProductBaseEndpoints} from "./endpoints/base/product.endpoints";
import {makeStoreProductBaseEndpoints} from "./endpoints/base/storeProduct.endpoints";
import {makeSaleBaseEndpoints} from "./endpoints/base/sale.endpoints";
import {makeInvoiceBaseEndpoints} from "./endpoints/base/invoice.endpoints";
import {makeCustomerCardBaseEndpoints} from "./endpoints/base/customerCard.endpoints";
import {makeEmployeeEndpoints} from "./endpoints/advanced/employee.endpoints";
import {makeCategoryEndpoints} from "./endpoints/advanced/category.endpoitns";
import {makeSalesEndpoints} from "./endpoints/advanced/sales.endpoints";
import {makeStoreProductEndpoints} from "./endpoints/advanced/storeProduct.endpoints";
import {makeCustomerCardEndpoints} from "./endpoints/advanced/customerCard.endpoints";
import {makeInvoiceEndpoints} from "./endpoints/advanced/invoice.endpoints";

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
    makeInvoiceEndpoints();
    makeCustomerCardEndpoints();
};
