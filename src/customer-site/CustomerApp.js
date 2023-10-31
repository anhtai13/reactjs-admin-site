import "./CustomerApp.css";

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import CustomerLayout from "./layouts/CustomerLayout";

import CustomerNotFoundPage from "./pages/errors/CustomerNotFoundPage";
import CustomerRegisterPage from "./pages/auth/CustomerRegisterPage";
import CustomerLoginPage from "./pages/auth/CustomerLoginPage";
import CustomerHomePage from "./pages/CustomerHomePage";
import CartList from "./pages/cart/CartList";
import ProductList from "./pages/products/ProductList";
import CustomerMenuComponent from "./components/partials/CustomerMenuComponent";
import OrderList from "./pages/orders/OrderList";

function CustomerApp() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/register" element={<CustomerRegisterPage />} />
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/" element={<CustomerLayout />}>
          <Route path="/home" element={<CustomerMenuComponent />} />
          <Route path="/cart" element={<CartList />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/order" element={<OrderList />} />
          <Route index element={<CustomerHomePage />} />
          <Route path="*" element={<CustomerNotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default CustomerApp;
