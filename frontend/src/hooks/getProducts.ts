// @ts-ignore
import {asServerUrl} from "./helpers.ts";

export const getProducts = async () => {
    const response = await fetch(asServerUrl('/products'));

    if (!response.ok) {
        throw new Error('Cannot retrieve store products');
    }

    const {data} = await response.json();
    console.log(data);
    return data;
};