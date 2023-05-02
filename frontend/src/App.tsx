import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// @ts-ignore
import {Toolbar} from "./components/Toolbar/Toolbar.tsx";
// @ts-ignore
import {AuthPage} from "./components/AuthPage/AuthPage.tsx";
// @ts-ignore
import {HomePage} from "./components/HomePage/HomePage.tsx";
// @ts-ignore
import {useAppContext} from "./context/AppContext.tsx";
// @ts-ignore
import {EmployeesPage} from "./components/EmployeesComps/EmployeesPage.tsx";
// @ts-ignore
import {CategoriesPage} from "./components/CategoriesComps/CategoriesPage.tsx";
// @ts-ignore
import {StoreProductsPage} from "./components/StoreProductsComps/StoreProductsPage.tsx";
// @ts-ignore
import {InvoicesPage} from "./components/InvoicesComps/InvoicesPage.tsx";
// @ts-ignore
import {CustomerCardPage} from "./components/CustomerCardComps/CustomerCardPage.tsx";

export const App = () => {
    const {currentEmployee} = useAppContext();

    return (
        <>
            {!currentEmployee
                ? <AuthPage/>
                : (
                    <Router>
                        <>
                            <Toolbar/>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/employees" element={<EmployeesPage />} />
                                <Route path="/categories" element={<CategoriesPage />} />
                                <Route path="/store-products" element={<StoreProductsPage />} />
                                <Route path="/invoices" element={<InvoicesPage />} />
                                <Route path="/customer-cards" element={<CustomerCardPage />} />
                            </Routes>
                        </>
                    </Router>
                )
            }
        </>
    )
};
