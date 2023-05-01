import {createContext, useContext, useState} from "react";
import {Maybe, SetState} from "../typings/typedefs";
import {Employee} from "../typings/employee.typedefs";

export const emptyFunction = () => {};

interface AppContextInterface {
  currentEmployee: Maybe<Employee>;
  setCurrentEmployee: SetState<Employee>;
}

const AppContext = createContext<AppContextInterface>({
  currentEmployee: null,
  setCurrentEmployee: emptyFunction,
});

const AppContextProvider = ({children}) => {
  const [
    currentEmployee,
    setCurrentEmployee,
  ] = useState<Maybe<Employee>>(null);

  return (
    <AppContext.Provider value={{
      currentEmployee,
      setCurrentEmployee,
    }}>
      {children}
    </AppContext.Provider>
  )
};

const useAppContext = () => useContext(AppContext);

export {AppContextProvider, useAppContext};
