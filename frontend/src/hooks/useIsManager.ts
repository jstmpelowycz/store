import {useAppContext} from "../context/AppContext";
import {EmployeeRole} from "../typings/entities/employee.typedefs";

export const useIsManager = () => {
  const {currentEmployee} = useAppContext();

  return currentEmployee?.role === EmployeeRole.Manager;
}
