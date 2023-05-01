// @ts-ignore
import {asServerUrl} from "./helpers.ts";

export const getCategories = async () => {
  const response = await fetch(asServerUrl('/categories'));

  if (!response.ok) {
    throw new Error('Cannot retrieve categories');
  }

  const {data} = await response.json();

  return data;
};
