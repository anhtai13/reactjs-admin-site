import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  changeQuantity,
  checkOut,
} from "../../store/actions/customerCartAction";
import { useNavigate } from "react-router-dom";

import orderApi from "../../../apis/order.api";

function CartList() {
  const cart = useSelector((state) => state.customerCartReducer.cart) ?? [];

  const total = useSelector((state) => state.customerCartReducer.total);

  const dispatch = useDispatch();
  const navigate = useNavigate;
  const handleChange = (e, id) => {
    const quantity = Number(e.target.value);

    if (quantity > 0) {
      dispatch(
        changeQuantity({
          product_id: id,
          quantity: quantity,
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleCheckOut = () => {
    const isCheckout = window.confirm(
      "Bạn có chắc chắn muốn đặt đơn hàng này ?"
    );
    if (isCheckout) {
      orderApi
        .createOrder({
          cart: cart,
        })
        .then(() => {
          alert("Đã đặt hàng thành công");
          dispatch(checkOut());
        })
        .catch((error) => {
          console.log("error", error);
          if (error.response.status === 401) {
            alert(error.response.statusText);
            navigate("/login");
          } else {
            alert(error.response.statusText);
          }
        });
    }
  };

  return (
    <div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.unit_price.toLocaleString()} đ</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleChange(e, item.product_id)}
                    />
                  </td>
                  <td>
                    {(item.unit_price * item.quantity).toLocaleString()} đ
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.product_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Tổng giá đơn hàng</td>
              <td>{total.toLocaleString()} đ</td>
              <td>
                <Button class="btn btn-info" onClick={handleCheckOut}>
                  Order
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}
export default CartList;
