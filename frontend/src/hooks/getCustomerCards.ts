// @ts-ignore
import {asServerUrl} from "./helpers.ts";

export const getCustomerCards = async () => {
    const response = await fetch(asServerUrl('/customer-cards'));

    if (!response.ok) {
        throw new Error('Cannot retrieve store products');
    }

    const {data} = await response.json();
    console.log(data);
    return data;
};