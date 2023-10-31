import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Routes, Route } from "react-router-dom";

import AdminApp from "./admin-site/AdminApp";

import CustomerApp from "./customer-site/CustomerApp";
function App() {
  const state = useSelector((state) => state);

  useEffect(() => {
    localStorage.setItem("reduxState", JSON.stringify(state));
  }, [state]);

  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<CustomerApp />} />
      <Route path="/*" element={<CustomerApp />} />
    </Routes>
  );
}

export default App;
