import { createAction } from "@reduxjs/toolkit";

const adminGetProduct = createAction("ADMIN_GET_PRODUCT");
const adminAddProduct = createAction("ADMIN_ADD_PRODUCT");
const adminUpdateProduct = createAction("ADMIN_UPDATE_PRODUCT");
const adminDeleteProduct = createAction("ADMIN_DELETE_PRODUCT");

export {
  adminAddProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminGetProduct,
};
