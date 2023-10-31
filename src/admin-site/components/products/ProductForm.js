import { useEffect } from "react";
import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import ResourceNotFound from "../errors/ResourceNotFound";

import productApi from "../../../apis/product.api";

function ProductForm({ productId, onSubmit, onCancel }) {
  const [isEdit, setIsEdit] = useState(false);

  const [product, setProduct] = useState(null);

  const [errors, setErrors] = useState(new Map());

  useEffect(() => {
    setIsEdit(productId !== undefined);

    if (productId === undefined) {
      setProduct({
        name: "",
        sku: "",
        category: "",
        description: "",
        unit_price: "",
        image: null,
      });
    } else {
      productApi
        .getProductByProductId(productId)
        .then((response) => {
          setProduct({
            ...response,
            sku: response.sku || "",
            name: response.name || "",
            image: null,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [productApi]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "image":
        setProduct({
          ...product,
          [name]: event.target.files[0],
        });
        break;
      default:
        setProduct({
          ...product,
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

      formData.append("name", product.name);
      formData.append("sku", product.sku);
      formData.append("description", product.description);
      formData.append("unit_price", product.unit_price);
      formData.append("category", product.category);

      if (product.image) {
        formData.append("image", product.image);
      }

      onSubmit(formData);
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = new Map();

    if (
      product.name.length < 4 ||
      product.name.length > 69 ||
      /^[A-Za-z0-9]$/.test(product.name)
    ) {
      errors.set("name", "Tên sản phẩm bắt buộc nhập từ 4 đến 69 ký tự.");
    }

    if (product.description !== null && product.description.length >= 100) {
      errors.set("description", "Mô tả chỉ được phép nhập nhỏ hơn 100 ký tự.");
    }

    if (!product.sku) {
      errors.set("sku", "Mã sản phẩm không được để trống");
    }

    if (isNaN(product.unit_price)) {
      errors.set("unit_price", "đơn vị tiền chỉ được phép nhập số.");
    }

    return errors;
  };

  return (
    <>
      {product ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              Tên Sản Phẩm <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("name")}
            />
            <Form.Text className="text-danger">{errors.get("name")}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Mã sản phẩm <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              disabled={isEdit}
              isInvalid={errors.get("sku")}
            />
            <Form.Text className="text-danger">{errors.get("sku")}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả sản phẩm</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={product.description}
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
              value={product.unit_price}
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
                checked={product.category === 2}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category"
                label="Áo sơ mi"
                id="category-2"
                value={1}
                checked={product.category === 1}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                name="category"
                label="Quần"
                id="category-3"
                value={3}
                checked={product.category === 3}
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

export default ProductForm;
