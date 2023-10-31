import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { customerLogout } from "../../store/actions/customerAuthAction";

function CustomerHeaderComponent() {
  const numberOfItem = useSelector(
    (state) => state.customerCartReducer.numberOfItem
  );
  const cart = useSelector((state) => state.customerCartReducer.cart) ?? [];
  console.log("number", numberOfItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(customerLogout());
    navigate("/login");
  };
  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ marginBottom: "10px" }}
      >
        <Container fluid>
          <Navbar.Brand>
            <Link
              to={"/home"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Shopping Now.
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link
                  to={"/home"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to={"/product"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Products
                </Link>
              </Nav.Link>
              <NavDropdown title="Action" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={handleLogoutUser}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Link to="/cart" className="float-end m-1">
              <Button variant="warning">
                Giỏ hàng <Badge>{cart.length}</Badge>
              </Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomerHeaderComponent;
