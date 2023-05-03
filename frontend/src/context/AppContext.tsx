import {FC, PropsWithChildren, createContext, useContext, useState} from "react";
import {SetState} from "../typings/typedefs";
import {Employee} from "../typings/entities/employee.typedefs";

export const emptyFunction = () => {
};

interface AppContextInterface {
  currentEmployee: Employee | null;
  isManager: boolean;
  setCurrentEmployee: SetState<Employee | null>;
  setIsManager: SetState<boolean>;
}

const AppContext = createContext<AppContextInterface>({
  currentEmployee: null,
  isManager: false,
  setCurrentEmployee: emptyFunction,
  setIsManager: emptyFunction,
});

const AppContextProvider: FC<PropsWithChildren> = ({children}) => {
  const [
    currentEmployee,
    setCurrentEmployee,
  ] = useState<Employee | null>(null);

  const [
    isManager,
    setIsManager,
  ] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{
      currentEmployee,
      isManager,
      setCurrentEmployee,
      setIsManager,
    }}>
      {children}
    </AppContext.Provider>
  )
};

const useAppContext = () => useContext(AppContext);

export {AppContextProvider, useAppContext};
