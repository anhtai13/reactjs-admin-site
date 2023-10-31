import { createReducer } from "@reduxjs/toolkit";

const calculateTotal = (cart) => {
  let total = 0;
  for (let item of cart) {
    total = total + item.unit_price * item.quantity;
  }

  return total;
};

const customerCartReducer = createReducer(
  { cart: [], order: [], total: 0, numberOfItem: 0, orderList: [] },
  {
    ADD_TO_CART: (state, action) => {
      // Khởi tạo một biến isExist để xem mặt hàng có tồn tại trong giỏ hàng không
      let isExist = false;
      // Sử dụng hàm map để lập lại các mặt hàng hiện có trong giỏ hàng
      let addCart = state.cart.map((item) => {
        // Nếu có cùng id của mục đó trùng với id được thêm vào
        if (item.product_id === action.payload.product_id) {
          // mặt hàng đó tồn tại trong giỏ hàng
          isExist = true;
          // trong trường hợp đó cập nhật số lượng của đơn hàng và tính tổng số tiền đơn hàng
          return {
            ...item,
            quantity: item.quantity + action.payload.quantity,
            subTotal: item.unit_price * item.quantity,
          };
        }
        return item;
      });
      // Nếu không tìm thấy mặt hàng nào cùng id thì thêm mặt hàng đó vào giỏ hàng
      if (!isExist) {
        addCart = [
          ...addCart,
          {
            ...action.payload,
            subTotal: action.payload.unit_price * action.payload.quantity,
          },
        ];
      }

      return { ...state, cart: addCart, total: calculateTotal(addCart) };
    },

    DELETE_TO_CART: (state, action) => {
      const newCart = state.cart.filter(
        (item) => item.product_id !== action.payload
      );
      return {
        ...state,
        cart: newCart,
        numberOfItem: newCart.length,
        total: calculateTotal(newCart),
      };
    },

    CHANGE_QUANTITY: (state, action) => {
      let cart = state.cart.map((item) => {
        if (item.product_id === action.payload.product_id) {
          return {
            ...item,
            quantity: action.payload.quantity,
            subTotal: item.unit_price * item.quantity,
          };
        }
        return item;
      });

      return {
        ...state,
        cart: cart,
        numberOfItem: cart.length,
        total: calculateTotal(cart),
      };
    },

    CHECK_OUT: (state, action) => {
      // Tạo một đôi tượng đơn hàng mới với các mặt hàng hiện tại và thông tin khách hàng
      const newOrder = {
        ...action.payload,
        date: new Date().toISOString(),
      };

      // Đặt lại giỏ hàng, đơn hàng bộ đếm
      return {
        ...state,
        cart: [],
        order: [...state.order, newOrder],
        total: 0,
        numberOfItem: 0,
      };
    },

    DELETE_FROM_ORDER: (state, action) => {
      console.log(action.payload);
      const newOrder = state.order.filter(
        (item) => item.product_id !== action.payload
      );
      return {
        ...state,
        order: newOrder,
      };
    },
  }
);

export default customerCartReducer;
