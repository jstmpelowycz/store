import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Toolbar} from "./components/ui/Toolbar/Toolbar";
import {HomePage} from "./components/pages/HomePage";
import {useAppContext} from "./context/AppContext";
import {EmployeesPage} from "./components/pages/EmployeesPage";
import {CategoriesPage} from "./components/pages/CategoriesPage";
import {StoreProductsPage} from "./components/pages/StoreProductsPage";
import {InvoicesPage} from "./components/pages/InvoicesPage";
import {CustomerCardPage} from "./components/pages/CustomerCardPage";
import {ProductsPage} from "./components/pages/ProductsPage";
import {Login} from "./components/auth/Login";

export const App = () => {
  const {currentEmployee} = useAppContext();

  return (
    <>
      {!currentEmployee
        ? <Login/>
        : (
          <BrowserRouter>
            <>
              <Toolbar/>
              <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/employees" element={<EmployeesPage/>}/>
                <Route path="/categories" element={<CategoriesPage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/store-products" element={<StoreProductsPage/>}/>
                <Route path="/invoices" element={<InvoicesPage/>}/>
                <Route path="/customer-cards" element={<CustomerCardPage/>}/>
              </Routes>
            </>
          </BrowserRouter>
        )
      }
    </>
  )
};
