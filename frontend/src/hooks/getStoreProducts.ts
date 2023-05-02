// @ts-ignore
import {asServerUrl} from "./helpers.ts";

export const getStoreProducts = async () => {
    const response = await fetch(asServerUrl('/store-products'));

    if (!response.ok) {
        throw new Error('Cannot retrieve store products');
    }

    const {data} = await response.json();
    console.log(data);
    return data;
};