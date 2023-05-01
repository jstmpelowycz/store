import {CreateEmployeeFields, Employee} from "../typings/employee.typedefs";
import {AnyFunction, Throwable} from "../typings/typedefs";

export const signup = async (
  fields: CreateEmployeeFields,
): Promise<Throwable<Employee>> => {
  const response = await fetch('/employee/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up employee');
  }

  return response.json();
}
