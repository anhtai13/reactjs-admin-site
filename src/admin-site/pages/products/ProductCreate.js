import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/products/ProductForm";

import productApi from "../../../apis/product.api";

function ProductCreate() {
  const navigate = useNavigate();

  const handleAdd = (product) => {
    productApi
      .createProducts(product)
      .then((response) => {
        navigate("/admin/products");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/admin/login");
        } else {
          alert(error.response.statusText);
        }
      });
  };

  return (
    <>
      <h1>Thêm mới người dùng</h1>
      <ProductForm
        onSubmit={handleAdd}
        onCancel={() => navigate("/admin/products")}
      />
    </>
  );
}

export default ProductCreate;
