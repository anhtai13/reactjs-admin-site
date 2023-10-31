import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm";

import productApi from "../../../apis/product.api";
import { useEffect } from "react";

function ProductEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(()=>{

  },[])
  const handleUpdate = (product) => {
    productApi
      .updateProduct(id, product)
      .then(() => {
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
      <h1>Chỉnh sửa thông tin sản phẩm</h1>
      <ProductForm
        productId={id}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin/products")}
      />
    </>
  );
}

export default ProductEdit;
