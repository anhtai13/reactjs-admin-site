import { createReducer } from "@reduxjs/toolkit";
import getNextId from "../../utilities/getNextId";
import initProducts from "./../init-data/products";

const listProducts = initProducts;

// window.localStorage.getItem("products")
//   ? JSON.parse(window.localStorage.getItem("products"))
//   : initProducts;

const productAdReducer = createReducer(
  { products: listProducts },
  {
    ADMIN_ADD_PRODUCT: (state, action) => {
      const products = state.products;

      const newProduct = [
        ...products,
        {
          ...action.payload,
          id: getNextId(products),
        },
      ];

      return {
        ...state,
        products: newProduct,
      };
    },

    ADMIN_GET_PRODUCT: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        listProducts: action.payload,
      };
    },

    ADMIN_UPDATE_PRODUCT: (state, action) => {
      const products = state.products;


      let newProducts = [];

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === action.payload.id) {
          newProducts.push({ ...action.payload });
        } else {
          newProducts.push({ ...products[i] });
        }
      }


      return {
        ...state,
        products: newProducts,
      };
    },

    ADMIN_DELETE_PRODUCT: (state, action) => {
      let newList = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      // localStorage.setItem("products", JSON.stringify(newList));

      return {
        ...state,
        products: newList,
      };
    },
  }
);

export default productAdReducer;
