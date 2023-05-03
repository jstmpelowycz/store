import {
  CreateEmployeeFields,
  Employee,
  EmployeeRole,
  EmployeesPhoneNumberAndAddress,
  UpdateEmployeeFields
} from "../typings/entities/employee.typedefs";
import {buildUrl, makeRequest} from "../helpers/requests/requests.factory";
import {REQUEST_URLS, RequestType} from "../helpers/requests/requests.constants";
import {RF} from "../helpers/requests/requests.typedefs";

interface LoginArgs {
  email: string;
  password: string;
}

interface CreateEmployeeArgs {
  fields: CreateEmployeeFields;
}

interface UpdateEmployeeArgs {
  id: Employee['id'];
  fields: UpdateEmployeeFields;
}

const login: RF<Employee> = async (args: LoginArgs) => {
  return makeRequest(RequestType.Post, {
    url: REQUEST_URLS.employee.login,
    body: args,
  });
};

const getById: RF<Employee> = async (id: number) => {
  return makeRequest(RequestType.Get, {
    url: buildUrl(REQUEST_URLS.employees, [id]),
  });
};

const getContactsByLastName: RF<EmployeesPhoneNumberAndAddress> = async (lastName: string) => {
  return makeRequest(RequestType.Get, {
    url: buildUrl(REQUEST_URLS.employee.contacts, [lastName]),
  });
};

const getAll: RF<Employee[]> = async (cashiersOnly = false) => {
  const employees = await makeRequest<Employee[]>(RequestType.Get, {
    url: REQUEST_URLS.employees,
  });

  return cashiersOnly
    ? employees.filter(({role}) => role === EmployeeRole.Cashier)
    : employees;
};

const create: RF<Employee> = async (args: CreateEmployeeArgs) => {
  return makeRequest(RequestType.Post, {
    url: REQUEST_URLS.employees,
    body: args.fields,
  });
};

const update: RF<Employee> = async (args: UpdateEmployeeArgs) => {
  return makeRequest(RequestType.Put, {
    url: buildUrl(REQUEST_URLS.employees, [args.id]),
    body: args.fields,
  });
};

const destroy: RF = async (id: Employee['id']) => {
  return makeRequest(RequestType.Delete, {
    url: buildUrl(REQUEST_URLS.employees, [id]),
  });
};

export const employeeControllers = {
  login,
  getById,
  getContactsByLastName,
  getAll,
  create,
  update,
  destroy,
};
