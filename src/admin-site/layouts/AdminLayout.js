import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Outlet, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AdminHeaderComponent from "../components/partials/AdminHeaderComponent";
import AdminFooterComponent from "../components/partials/AdminFooterComponent";
import AdminMenuComponent from "../components/partials/AdminMenuComponent";

import authApi from "../../apis/auth.api";
import {
  adminAuthLogout,
  setAdminAuth,
} from "../store/actions/adminAuthAction";

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [auth, setAuth] = useState({});

  useEffect(() => {
    authApi
      .getAuth()
      .then((response) => {
        if (response.role === 1) {
          setAuth(response);
          dispatch(setAdminAuth(response));
        } else {
          dispatch(adminAuthLogout());
          navigate("/admin/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          dispatch(adminAuthLogout());
          navigate("/admin/login");
        } else {
          alert(error.response.statusText);
        }
      });
  }, []);

  return (
    <Container>
      <header>
        <AdminHeaderComponent />
      </header>
      <Row>
        <Col md={2}>
          <AdminMenuComponent auth={auth} />
        </Col>
        <Col md={10}>
          <div className="m-4">
            <Outlet />
          </div>
        </Col>
        <Col md={20}>
          <footer>
            <AdminFooterComponent />
          </footer>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLayout;
