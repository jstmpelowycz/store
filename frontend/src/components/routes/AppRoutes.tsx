import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/HomePage/HomePage";
import {CategoriesPage} from "../pages/CategoriesPage/CategoriesPage";
import {ProductsPage} from "../pages/ProductsPage/ProductsPage";
import {StoreProductsPage} from "../pages/StoreProductsPage/StoreProductsPage";
import {InvoicesPage} from "../pages/InvoicesPage/InvoicesPage";
import {CustomerCardPage} from "../pages/CustomerCardPage/CustomerCardPage";
import {EmployeesPage} from "../pages/EmployeesPage/EmployeesPage";
import {useIsManager} from "../../hooks/useIsManager";
import {ProfilePage} from "../pages/ProfilePage/ProfilePage";
import {OperationsPage} from "../pages/OperationsPage/OperationsPage";

export const AppRoutes: FC = () => {
  const isManager = useIsManager();

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/categories" element={<CategoriesPage/>}/>
      <Route path="/products" element={<ProductsPage/>}/>
      <Route path="/store-products" element={<StoreProductsPage/>}/>
      <Route path="/invoices" element={<InvoicesPage/>}/>
      <Route path="/customer-cards" element={<CustomerCardPage/>}/>
      <Route path="/operations" element={<OperationsPage/>}/>

      {isManager && (
        <Route path="/employees" element={<EmployeesPage/>}/>
      )}
    </Routes>
  )
}
