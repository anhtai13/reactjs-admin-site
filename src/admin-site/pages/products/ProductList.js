import { Table, Button, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../components/table/AdminPaginationComponent";

import productApi from "../../../apis/product.api";

const formatCategory = (category) => {
  if (category === 1) {
    return <Badge bg="warning">Áo sơ mi</Badge>;
  } else if (category === 2) {
    return <Badge bg="success">Áo phong</Badge>;
  } else if (category === 3) {
    return <Badge>Quần</Badge>;
  }
};

function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const fetchProducts = () => {
    productApi
      .searchProducts({
        name: keyword,
        page: page,
        limit: 5,
      })
      .then((data) => {
        setProducts(data.records);
        setTotal(data.total);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/admin/login");
        } else {
          alert(error.response.statusText);
        }
      });

    setSelectedProductIds([]);
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  const handleAdd = () => {
    navigate("/admin/products/new");
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleBulkDelete = () => {
    const name = products
      .filter(
        (product) =>
          !!selectedProductIds.find(
            (selectedProductId) => selectedProductId === product.product_id
          )
      )
      .map((product) => product.name);

    if (
      window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm [${name}] không ?`)
    ) {
      // TODO
      fetchProducts();
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${name} không ?`)) {
      productApi
        .deleteProduct(id)
        .then(() => {
          fetchProducts();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert(error.response.statusText);
            navigate("/admin/login");
          } else {
            alert(error.response.statusText);
          }
        });
    }
  };

  const changeProductIdCheckbox = (event) => {
    if (event.target.checked) {
      setSelectedProductIds([
        ...selectedProductIds,
        parseInt(event.target.value),
      ]);
    } else {
      const newSelectedProductIds = selectedProductIds.filter(
        (selectedProductId) =>
          selectedProductId !== parseInt(event.target.value)
      );
      setSelectedProductIds(newSelectedProductIds);
    }
  };

  const selectAllProductIdCheckboxes = (event) => {
    if (event.target.checked) {
      const productIds = products.map((product) => product.product_id);
      setSelectedProductIds(productIds);
    } else {
      setSelectedProductIds([]);
    }
  };

  const isSelectedAllProductId =
    selectedProductIds.length !== 0 &&
    selectedProductIds.length === products.length;

  return (
    <>
      <h1>Danh sách dịch vụ</h1>
      <Form className="row m-1 mb-3" onSubmit={handleSearch}>
        <div className="col-8">
          <Form.Control
            type="text"
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
            placeholder="Nhập từ khóa"
          />
        </div>
        <div className="col-4">
          <Button type="submit" variant="info mx-1">
            Tìm kiếm
          </Button>
          <Button type="button" variant="primary mx-1" onClick={handleAdd}>
            Thêm mới
          </Button>
          {selectedProductIds.length !== 0 && (
            <Button
              type="button"
              variant="danger mx-1"
              onClick={handleBulkDelete}
            >
              Xóa
            </Button>
          )}
        </div>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={selectAllProductIdCheckboxes}
                checked={isSelectedAllProductId}
              />
            </th>
            <th>Tên sản phẩm</th>
            <th>Mô tả sản phẩm</th>
            <th>Loại hàng</th>
            <th>Giá tiền</th>
            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="id"
                    id={"id-" + product.product_id}
                    value={product.product_id}
                    onChange={changeProductIdCheckbox}
                    checked={selectedProductIds.find(
                      (id) => id === product.product_id
                    )}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{formatCategory(product.category)}</td>
                <td>{product.unit_price.toLocaleString()}</td>
                <td>{moment(product.created_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>{moment(product.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => handleEdit(product.product_id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() =>
                      handleDelete(product.product_id, product.name)
                    }
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AdminPaginationComponent total={total} setPage={setPage} />
    </>
  );
}

export default ProductList;
