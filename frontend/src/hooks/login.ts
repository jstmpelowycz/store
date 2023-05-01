import {Employee} from "../typings/employee.typedefs";
import {Throwable} from "../typings/typedefs";
// @ts-ignore
import {asServerUrl} from "./helpers.ts";

export const login = async (
  fields: {
    email: string,
    password: string
  },
): Promise<Throwable<Employee>> => {
  const response = await fetch(asServerUrl('/employee/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fields)
  });

  if (!response.ok) {
    throw new Error('Failed to log in employee');
  }

  return response.json();
}
