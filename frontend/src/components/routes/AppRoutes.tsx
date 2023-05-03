import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import {CategoriesPage} from "../pages/CategoriesPage";
import {ProductsPage} from "../pages/ProductsPage";
import {StoreProductsPage} from "../pages/StoreProductsPage";
import {InvoicesPage} from "../pages/InvoicesPage";
import {CustomerCardPage} from "../pages/CustomerCardPage";
import {EmployeesPage} from "../pages/EmployeesPage";
import {useIsManager} from "../../hooks/useIsManager";
import {ProfilePage} from "../pages/ProfilePage";

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

      {isManager && <Route path="/employees" element={<EmployeesPage/>}/>}
    </Routes>
  )
}
