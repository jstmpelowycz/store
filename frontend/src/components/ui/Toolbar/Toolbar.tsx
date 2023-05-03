import {Link} from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {useAppContext} from "../../../context/AppContext";


export const Toolbar = () => {
  const {setCurrentEmployee} = useAppContext();

  const handleLogout = () => {
    setCurrentEmployee(null);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="d-block w-100">
      <Container>
        <Navbar.Brand href="#">Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" role="navigation">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/employees">
              Employees
            </Nav.Link>

            <Nav.Link as={Link} to="/categories">
              Categories
            </Nav.Link>

            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            <Nav.Link as={Link} to="/store-products">
              Store Products
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
