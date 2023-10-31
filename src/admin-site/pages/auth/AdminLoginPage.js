import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, Form, Row, Col } from "react-bootstrap";

import authApi from "../../../apis/auth.api";
import { adminAuthLogin } from "../../store/actions/adminAuthAction";

function AdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Validate

    authApi
      .login(username, password, "admin")
      .then((response) => {
        dispatch(adminAuthLogin(response.token));

        navigate("/admin");
      })
      .catch((error) => {
        alert(error.response.statusText);
      });
  };

  return (
    <Row>
      <Col md={4}></Col>
      <Col md={4}>
        <h1 className="text-center my-5">Đăng nhập quản trị viên</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-center">
            <Button type="submit" variant="primary">
              Đăng nhập
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col md={4}></Col>
    </Row>
  );
}

export default AdminLoginPage;
