import { Col, Row, Form, Button } from "react-bootstrap";
import ProductDetail from "./ProductDetail";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../../admin-site/components/table/AdminPaginationComponent";

import productApi from "../../../apis/product.api";

const getRows = (products) => {
  let rows = [];
  let row = [];

  for (const product of products) {
    row.push(product);

    if (row.length === 3) {
      rows.push(row);
      row = [];
    }
  }

  if (row.length !== 0) {
    rows.push(row);
  }
  return rows;
};

function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);

  const rows = getRows(products);

  const fetchProducts = () => {
    productApi
      .searchProducts({
        name: keyword,
        page: page,
        limit: 9,
      })
      .then((data) => {
        setProducts(data.records);
        setTotal(data.total);
      })
      .catch((error) => {
        if (error.respone.status === 401) {
          alert(error.respone.statusText);
          navigate("/customer/login");
        } else {
          alert(error.respone.statusText);
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  return (
    <div className="text-center mt-3">
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
        </div>
      </Form>

      <div>
        {rows.map((row, index) => {
          return (
            <Row key={index}>
              {row.map((product, index) => {
                return (
                  <Col key={index}>
                    <ProductDetail product={product} />
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
      <AdminPaginationComponent total={total} setPage={setPage} />
    </div>
  );
}
export default ProductList;
