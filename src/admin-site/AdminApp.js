import "./AdminApp.css";

import { Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../customer-site/store";

import AdminLayout from "./layouts/AdminLayout";

import AdminNotFoundPage from "./pages/errors/AdminNotFoundPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";
import AdminHomePage from "./pages/AdminHomePage";

import UserList from "../admin-site/pages/users/UserList";
import UserCreate from "../admin-site/pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";

import OrderList from "./pages/orders/OrderList";
import OrderEdit from "./pages/orders/OrderEdit";

import ContactList from "./pages/contacts/ContactList";
import ContactEdit from "./pages/contacts/contactEdit";
import ServiceList from "./pages/services/ServiceList";
import ServiceCreate from "./pages/services/ServiceCreate";
import ServiceEdit from "./pages/services/ServiceEdit";

function AdminApp() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/" element={<AdminLayout />}>
          <Route path="users" element={<UserList />} />
          <Route path="users/new" element={<UserCreate />} />
          <Route path="users/:id/edit" element={<UserEdit />} />

          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/new" element={<ServiceCreate />} />
          <Route path="/services/:id/edit" element={<ServiceEdit />} />

          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id/edit" element={<OrderEdit />} />

          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contacts/:id/edit" element={<ContactEdit />} />

          <Route index element={<AdminHomePage />} />
          <Route path="*" element={<AdminNotFoundPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default AdminApp;
