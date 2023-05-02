import {createContext, useContext, useState} from "react";
import {Maybe, SetState} from "../typings/typedefs";
import {Employee} from "../typings/employee.typedefs";

export const emptyFunction = () => {};

interface AppContextInterface {
  currentEmployee: Maybe<Employee>;
  isManager: Boolean;
  setCurrentEmployee: SetState<Employee>;
  setIsManager: SetState<Boolean>;
}

const AppContext = createContext<AppContextInterface>({
  currentEmployee: null,
  isManager: false,
  setCurrentEmployee: emptyFunction,
  setIsManager: emptyFunction,
});

const AppContextProvider = ({children}) => {
  const [
    currentEmployee,
    setCurrentEmployee,
  ] = useState<Maybe<Employee>>(null);

  const [
    isManager,
    setIsManager,
  ] = useState<Boolean>(false);

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
