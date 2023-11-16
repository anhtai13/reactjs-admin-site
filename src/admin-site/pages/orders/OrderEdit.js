import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import OrderForm from "../../components/orders/orderForm";

import orderApi from "../../../apis/order.api";

function OrderEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const handleUpdate = (order) => {
    console.log("check formdata 2");
    // for (const [key, value] of order.entries()) {
    //   console.log(key, value);
    // }
    orderApi
      .updateOrder(id, order)
      .then(() => {
        navigate("/admin/orders");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/admin/login");
        } else {
          alert(error.response.statusText);
          // console.log(id, order);
        }
      });
  };

  return (
    <>
      <h1>Cập nhật đơn hàng</h1>
      <OrderForm
        orderId={id}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin/orders")}
      />
    </>
  );
}

export default OrderEdit;
