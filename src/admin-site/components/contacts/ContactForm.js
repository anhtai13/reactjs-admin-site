import { useEffect } from "react";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import ResourceNotFound from "../errors/ResourceNotFound";

import contactApi from "../../../apis/contact.api";

function ContactForm({ contactId, onSubmit, onCancel }) {
  const [isEdit, setIsEdit] = useState(false);

  const [contact, setContact] = useState(null);

  const [errors, setErrors] = useState(new Map());

  useEffect(() => {
    setIsEdit(contactId !== undefined);

    if (contactId === undefined) {
      setContact({
        serial_number: "",
        user_id: "",
        username: "",
        status: "",
        content: "",
      });
    } else {
      contactApi
        .getContactByContactId(contactId)
        .then((response) => {
          setContact({
            ...response,
            serial_number: response.serial_number || "",
            user_id: response.user_id || "",
            status: response.status || "",
            content: response.content || "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [contactId]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "image":
        setContact({
          ...contact,
          [name]: event.target.files[0],
        });
        break;
      default:
        setContact({
          ...contact,
          [name]: name === "status" ? parseInt(value) : value,
        });
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(new Map());

    const errors = validate();
    if (errors.size === 0) {
      const formData = new FormData();

      formData.append("contact_id", contact.contact);
      formData.append("full_name", contact.full_name);
      formData.append("email", contact.email);
      formData.append("content", contact.content);
      formData.append("status", contact.status);

      if (contact.image) {
        formData.append("image", contact.image);
      }

      onSubmit(formData);
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = new Map();

    // if (
    //   order.serial_number.length < 1 ||
    //   order.serial_number.length > 69 ||
    //   /^[A-Za-z0-9]$/.test(order.serial_number)
    // ) {
    //   errors.set(
    //     "serial_number",
    //     "Tên sản phẩm bắt buộc nhập từ 4 đến 69 ký tự."
    //   );
    // }

    // if (!order.serial_number) {
    //   errors.set("serial_number", "Mã sản phẩm không được để trống");
    // }

    // if (isNaN(order.total_price)) {
    //   errors.set("total_price", "đơn vị tiền chỉ được phép nhập số.");
    // }

    return errors;
  };

  return (
    <>
      {contact ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              Họ và tên <span className="text-danger"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={contact.full_name}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("full_name")}
            />
            <Form.Text className="text-danger">
              {errors.get("full_name")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Email <span className="text-danger"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={contact.email}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("email")}
            />
            <Form.Text className="text-danger">{errors.get("email")}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Nội dung <span className="text-danger"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="content"
              value={contact.content}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("content")}
            />
            <Form.Text className="text-danger">
              {errors.get("content")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Thời gian tạo <span className="text-danger"></span>
            </Form.Label>
            <Form.Control
              type="text"
              name="created_at"
              value={contact.created_at}
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
                checked={contact.status === 2}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="status"
                label="Liên hệ đã được gửi"
                id="status-1"
                value={1}
                checked={contact.status === 1}
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
              Cập nhật
            </Button>
          </Form.Group>
        </Form>
      ) : (
        <ResourceNotFound resourceName="người dùng" />
      )}
    </>
  );
}

export default ContactForm;
