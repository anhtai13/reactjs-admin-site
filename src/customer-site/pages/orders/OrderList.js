import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromOrder } from "../../store/actions/customerCartAction";
// import orderApi from "../../../apis/orderApi.api";

function OrderList() {
  const order = useSelector((state) => state.customerCartReducer.order);

  const dispatch = useDispatch();

  const handleDeleteOrder = (id) => {
    const isDeleteOrder = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không ?"
    );
    if (isDeleteOrder) {
      dispatch(deleteFromOrder(id));
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Tên sản phẩm</th> */}
            <th>Email</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng đơn hàng</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                {/* <td>{item.code}</td> */}
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>${item.total}</td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteOrder(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>

        {/* <tfoot>
          <tr>
            <td colSpan={4}>Tổng giá đơn hàng</td>
            <td></td>
          </tr>
        </tfoot> */}
      </Table>
    </div>
  );
}
export default OrderList;
