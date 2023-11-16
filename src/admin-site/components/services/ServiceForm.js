import { useEffect } from "react";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import ResourceNotFound from "../errors/ResourceNotFound";

import serviceApi from "../../../apis/service.api";

function ServiceForm({ serviceId, onSubmit, onCancel }) {
  const [isEdit, setIsEdit] = useState(false);

  const [service, setService] = useState(null);

  const [errors, setErrors] = useState(new Map());

  useEffect(() => {
    setIsEdit(serviceId !== undefined);
    if (serviceId === undefined) {
      console.log("ádasdasdasdas");
      setService({
        name_service: "",
        category_id: "",
        description: "",
        unit_price: "",
        image: null,
      });
    } else {
      serviceApi
        .getServiceByServiceId(serviceId)
        .then((response) => {
          console.log(response);
          setService({
            ...response,
            image: null,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [serviceApi]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "image":
        setService({
          ...service,
          [name]: event.target.files[0],
        });
        break;
      default:
        setService({
          ...service,
          [name]: name === "name_service" ? parseInt(value) : value,
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

      formData.append("name_service", service.name_service);
      formData.append("description", service.description);
      formData.append("unit_price", service.unit_price);
      formData.append("category_id", service.category_id);

      if (service.image) {
        formData.append("image", service.image);
      }

      onSubmit(formData);
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = new Map();

    if (
      service.name_service.length < 4 ||
      service.name_service.length > 69 ||
      /^[A-Za-z0-9]$/.test(service.name_service)
    ) {
      errors.set("name", "Tên dịch vụ bắt buộc nhập từ 4 đến 69 ký tự.");
    }

    if (service.description !== null && service.description.length >= 100) {
      errors.set("description", "Mô tả chỉ được phép nhập nhỏ hơn 100 ký tự.");
    }

    if (isNaN(service.unit_price)) {
      errors.set("unit_price", "đơn vị tiền chỉ được phép nhập số.");
    }

    return errors;
  };

  return (
    <>
      {service ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              Tên dịch vụ <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={service.name_service}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("name")}
            />
            <Form.Text className="text-danger">{errors.get("name")}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả dịch vụ</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={service.description}
              onChange={handleChange}
              isInvalid={errors.get("description")}
            />
            <Form.Text className="text-danger">
              {errors.get("description")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số tiền</Form.Label>
            <Form.Control
              type="number"
              name="unit_price"
              value={service.unit_price}
              onChange={handleChange}
              isInvalid={errors.get("unit_price")}
            />
            <Form.Text className="text-danger">
              {errors.get("unit_price")}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="mr-5">
              Loại hàng <span className="text-danger">*</span>
            </Form.Label>
            <div className="px-3">
              <Form.Check
                inline
                type="radio"
                name="category_id"
                label="Giặt"
                id="category-1"
                value={1}
                checked={service.category_id == "1"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category_id"
                label="Hong khô"
                id="category-2"
                value={2}
                checked={service.category_id == "2"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category_id"
                label="Giặt tay"
                id="category-3"
                value={3}
                checked={service.category_id == "3"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category_id"
                label="Giặt giày"
                id="category-4"
                value={4}
                checked={service.category_id == "4"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category_id"
                label="Giặt nhanh"
                id="category-4"
                value={5}
                checked={service.category_id == "5"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh mô tả</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleChange}
              multiple
            />
            <Form.Text className="text-danger">{errors.get("image")}</Form.Text>
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

export default ServiceForm;
