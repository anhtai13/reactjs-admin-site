import { Table, Button, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../components/table/AdminPaginationComponent";

import orderApi from "../../../apis/order.api";

const formatStatus = (status) => {
  if (status === 1) {
    return <Badge bg="secondary">Đơn hàng mới</Badge>;
  } else if (status === 2) {
    return <Badge bg="info">Đã xác thực</Badge>;
  } else if (status === 3) {
    return <Badge bg="warning">Đang giao hàng</Badge>;
  } else if (status === 4) {
    return <Badge>Đã giao hàng</Badge>;
  } else if (status === 5) {
    return <Badge>Đã thanh toán</Badge>;
  } else if (status === 6) {
    return <Badge bg="success">Hoàn tất</Badge>;
  } else if (status === 7) {
    return <Badge bg="danger">Bị từ chối</Badge>;
  }
};

function OrderList() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [listOrders, setListOrders] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  const fetchOrders = () => {
    orderApi
      .searchOrders({
        name: keyword,
        page: page,
        limit: NUMBER_RECORDS_PER_PAGE,
      })
      .then((data) => {
        setOrders(data.records);
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

    setSelectedOrderIds([]);
  };

  useEffect(() => {
    fetchOrders();
  }, [keyword, page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  const handleEdit = (id) => {
    navigate(`/admin/orders/${id}/edit`);
  };

  const handleShowDetail = (id) => {
    orderApi
      .getOrderDetailByOrderDetailId(id)
      .then((data) => {
        setListOrders(data);
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

  const handleBulkDelete = () => {
    const name = orders
      .filter(
        (order) =>
          !!selectedOrderIds.find(
            (selectedOrderIds) => selectedOrderIds === order.order_id
          )
      )
      .map((order) => order.name);

    if (
      window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng [${name}] không ?`)
    ) {
      // TODO
      fetchOrders();
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${name} không ?`)) {
      orderApi
        .deleteOrder(id)
        .then(() => {
          fetchOrders();
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

  const changeOrderIdCheckbox = (event) => {
    if (event.target.checked) {
      setSelectedOrderIds([...selectedOrderIds, parseInt(event.target.value)]);
    } else {
      const newSelectedOrderIds = selectedOrderIds.filter(
        (selectedOrderId) => selectedOrderId !== parseInt(event.target.value)
      );
      setSelectedOrderIds(newSelectedOrderIds);
    }
  };

  const selectAllOrderIdCheckboxes = (event) => {
    if (event.target.checked) {
      const orderIds = orders.map((order) => order.order_id);
      setSelectedOrderIds(orderIds);
    } else {
      setSelectedOrderIds([]);
    }
  };

  const isSelectedAllOrderId =
    selectedOrderIds.length !== 0 && selectedOrderIds.length === orders.length;

  return (
    <>
      <h1>Danh sách đơn hàng</h1>
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
          {selectedOrderIds.length !== 0 && (
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
                onChange={selectAllOrderIdCheckboxes}
                checked={isSelectedAllOrderId}
              />
            </th>
            <th>Mã đơn hàng</th>
            <th>ID Người dùng</th>
            <th>Tên người dùng</th>
            <th>Trạng thái</th>
            <th>Tổng tiền</th>
            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={index}>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="id"
                    id={"id -" + order.order_id}
                    value={order.order_id}
                    onChange={changeOrderIdCheckbox}
                    checked={selectedOrderIds.find(
                      (id) => id === order.order_id
                    )}
                  />
                </td>
                <td>{order.serial_number}</td>
                <td>{order.user_id}</td>
                <td>{order.username}</td>
                <td>{formatStatus(order.status)}</td>
                <td>{order.total_price}</td>
                <td>{moment(order.created_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>{moment(order.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => handleEdit(order.order_id)}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    variant="success"
                    className="m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleShowDetail(order.order_id)}
                  >
                    Chi tiết
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() =>
                      handleDelete(order.order_id, order.serial_number)
                    }
                  >
                    Hủy
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AdminPaginationComponent total={total} setPage={setPage} />
      {/* Modal  */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Chi tiết đơn hàng
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {listOrders.map((item) => {
                return (
                  <>
                    <div className="mb-5">
                      Tên sản phẩm: <b>{item.name}</b> <br />
                      Mã sản phẩm: <b>{item.sku}</b>
                      <br />
                      Số lượng sản phẩm: <b>{item.quantity}</b> <br />
                      Giá tiền mỗi sản phẩm:{" "}
                      <b>{item.unit_price.toLocaleString()} đ</b> <br />
                      Tổng tiền sản phẩm:{" "}
                      <b>{item.sub_total_price.toLocaleString()} đ</b>
                      <br />
                      Ảnh sản phẩm <br />
                      <div className="text-center">
                        <img src={item.image} height={200} width={200} />
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderList;
