// @ts-ignore
import {asServerUrl} from "./helpers.ts";

export const getEmployees = async (requesterId: number) => {
  const response = await fetch(asServerUrl(`/employees/${requesterId}`));


  if (!response.ok) {
    throw new Error('Cannot retrieve users');
  }

  const {data} = await response.json()

  return data;
}
