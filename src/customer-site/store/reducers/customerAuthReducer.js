import { createReducer } from "@reduxjs/toolkit";

const customerAuthReducer = createReducer(
  {
    // isLogin: false,
    customerLogin: null,
    listCustomer: [
      {
        email: "User@gmail.com",
        password: "User@gmail.com",
        role: "user",
      },
    ],
  },
  {
    CUSTOMER_REGISTER: (state, action) => {
      //   window.localStorage.removeItem("customerLogout");
      return {
        ...state,
        listCustomer: [...state.listCustomer, action.payload],
        // isLogin: false,
      };
    },

    CUSTOMER_LOGIN: (state, action) => {
      //   window.localStorage.removeItem("customerLogout");
      window.localStorage.setItem("X-API-Key", action.payload);
      return {
        ...state,
        customerLogin: action.payload,
        // isLogin: false,
      };
    },

    CUSTOMER_LOGOUT: (state, action) => {
      //   window.localStorage.removeItem("customerLogout");
      return {
        ...state,
        customerLogin: null,
        // isLogin: false,
      };
    },

    CUSTOMER_DELETE: (state, action) => {
      let newAcc = state.listCustomer.filter(
        (user) => user.email !== action.payload
      );

      return { ...state, listCustomer: newAcc };
    },
  }
);

export default customerAuthReducer;
