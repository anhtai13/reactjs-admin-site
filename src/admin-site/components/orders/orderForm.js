import { useEffect } from "react";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import ResourceNotFound from "../errors/ResourceNotFound";

import orderApi from "../../../apis/order.api";

function OrderForm({ orderId, onSubmit, onCancel }) {
  const [isEdit, setIsEdit] = useState(false);

  const [order, setOrder] = useState(null);

  const [errors, setErrors] = useState(new Map());

  useEffect(() => {
    setIsEdit(orderId !== undefined);

    if (orderId === undefined) {
      setOrder({
        serial_number: "",
        user_id: "",
        username: "",
        status: "",
        total_price: "",
      });
    } else {
      orderApi
        .getOrderByOrderId(orderId)
        .then((response) => {
          console.log(response);

          setOrder({
            ...response,
            status: response.status_id || "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [orderId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("check value", name, value);

    switch (name) {
      case "image":
        setOrder({
          ...order,
          [name]: event.target.files[0],
        });
        break;
      default:
        setOrder({
          ...order,
          [name]: name == "status" ? parseInt(value) : value,
        });
        console.log("check value", order);

        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(new Map());

    const errors = validate();
    if (errors.size === 0) {
      // const formData = new FormData();

      // formData.append("order_id", order.order_id);
      // formData.append("serial_number", order.serial_number);
      // formData.append("user_id", order.user_id);
      // formData.append("username", order.username);
      // formData.append("status_id", order.status);
      // formData.append("total_price", order.total_price);
      // formData.append("created_at", order.created_at);

      // if (order.image) {
      //   formData.append("image", order.image);
      // }
      // console.log("check formdata !");
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      onSubmit(order);
      // onSubmit(formData);
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = new Map();

    if (
      order.serial_number.length < 1 ||
      order.serial_number.length > 69 ||
      /^[A-Za-z0-9]$/.test(order.serial_number)
    ) {
      errors.set(
        "serial_number",
        "Tên sản phẩm bắt buộc nhập từ 4 đến 69 ký tự."
      );
    }

    if (!order.serial_number) {
      errors.set("serial_number", "Mã sản phẩm không được để trống");
    }

    if (isNaN(order.total_price)) {
      errors.set("total_price", "đơn vị tiền chỉ được phép nhập số.");
    }

    return errors;
  };

  return (
    <>
      {order ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              Mã đơn hàng <span className="text-danger"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="serial_number"
              value={order.serial_number}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("serial_number")}
            />
            <Form.Text className="text-danger">
              {errors.get("serial_number")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              ID người dùng <span className="text-danger"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="user_id"
              value={order.user_id}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("user_id")}
            />
            <Form.Text className="text-danger">
              {errors.get("user_id")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tổng tiền</Form.Label>
            <Form.Control
              type="number"
              disabled={isEdit}
              name="total_price"
              value={order.total_price}
              onChange={handleChange}
              isInvalid={errors.get("total_price")}
            />
            <Form.Text className="text-danger">
              {errors.get("total_price")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Thời gian tạo <span className="text-danger"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="created_at"
              value={order.created_at}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("created_at")}
            />
            <Form.Text className="text-danger">
              {errors.get("created_at")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mr-5">
              Trạng thái đơn hàng <span className="text-danger">*</span>
            </Form.Label>
            <div className="px-3">
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Đã xác thực"
                id="status-2"
                value={2}
                checked={order.status == 2}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Đơn hàng mới"
                id="status-1"
                value={1}
                checked={order.status == 1}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Đang giao hàng"
                id="status-3"
                value={3}
                checked={order.status == 3}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Đã giao hàng thành công"
                id="status-4"
                value={4}
                checked={order.status == 4}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Đã thanh toán"
                id="status-5"
                value={5}
                checked={order.status == 5}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Hoàn tất đơn hàng "
                id="status-6"
                value={6}
                checked={order.status == 6}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Đơn hàng bị hủy"
                id="status-7"
                value={7}
                checked={order.status == 7}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3 float-end">
            <Button
              type="button"
              variant="secondary"
              className="m-1"
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button type="submit" variant="success" className="m-1">
              Lưu
            </Button>
          </Form.Group>
        </Form>
      ) : (
        <ResourceNotFound resourceName="người dùng" />
      )}
    </>
  );
}

export default OrderForm;
