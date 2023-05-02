// @ts-ignore
import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
// @ts-ignore
import {useAppContext} from "../../context/AppContext.tsx";
import {Link} from 'react-router-dom';


export const Toolbar = () => {
    const {setCurrentEmployee} = useAppContext();

    const handleLogout = () => {
        setCurrentEmployee(null);
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">My Toolbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" role="navigation">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/employees">
                            Employees
                        </Nav.Link>
                        <Nav.Link as={Link} to="/categories">
                            Categories
                        </Nav.Link>
                        <Nav.Link as={Link} to="/store-products">
                            Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/invoices">
                            Invoices
                        </Nav.Link>
                        <Nav.Link as={Link} to="/customer-cards">
                            Customer Cards
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            href="#logout"
                            onClick={handleLogout}
                        >Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
