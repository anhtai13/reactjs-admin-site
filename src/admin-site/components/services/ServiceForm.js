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
      setService({
        service_name: "",
        category: "",
        description: "",
        unit_price: "",
        image: null,
      });
    } else {
      serviceApi
        .getServiceByServiceId(serviceId)
        .then((response) => {
          setService({
            ...response,
            name: response.service_name || "",
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
          [name]: name === "category" ? parseInt(value) : value,
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

      formData.append("service_name", service.service_name);
      formData.append("description", service.description);
      formData.append("unit_price", service.unit_price);
      formData.append("category", service.category);

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
      service.name.length < 4 ||
      service.name.length > 69 ||
      /^[A-Za-z0-9]$/.test(service.name)
    ) {
      errors.set("name", "Tên sản phẩm bắt buộc nhập từ 4 đến 69 ký tự.");
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
              Tên Sản Phẩm <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={service.service_name}
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
                name="category"
                label="áo phong"
                id="category-1"
                value={2}
                checked={service.category === 2}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category"
                label="Áo sơ mi"
                id="category-2"
                value={1}
                checked={service.category === 1}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category"
                label="Quần"
                id="category-3"
                value={3}
                checked={service.category === 3}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh mô tả sản phẩm</Form.Label>
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
