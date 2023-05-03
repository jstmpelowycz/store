import {BrowserRouter} from 'react-router-dom';
import {useAppContext} from "./context/AppContext";
import {Login} from "./components/auth/Login";
import {Toolbar} from "./components/ui/Toolbar/Toolbar";
import {AppRoutes} from "./components/routes/AppRoutes";

export const App = () => {
  const {currentEmployee} = useAppContext();

  return (
    <>
      {!currentEmployee
        ? <Login/>
        : (
          <BrowserRouter>
            <Toolbar/>
            <AppRoutes/>
          </BrowserRouter>
        )
      }
    </>
  )
};
