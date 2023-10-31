import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomerHeaderComponent from "../components/partials/CustomerHeaderComponent";
import CustomerMenuComponent from "../components/partials/CustomerMenuComponent";
import ProductList from "../pages/products/ProductList";

function CustomerLayout() {
  return (
    <Container>
      <div>
        <CustomerHeaderComponent />
      </div>
      <Outlet />
      <div>
        Footer <code>FIXME: src/customer-site/layouts/CustomerLayout.js</code>
      </div>
    </Container>
  );
}

export default CustomerLayout;
