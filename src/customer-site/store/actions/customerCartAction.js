import { createAction } from "@reduxjs/toolkit";

const addToCart = createAction("ADD_TO_CART");
const deleteFromCart = createAction("DELETE_TO_CART");
const changeQuantity = createAction("CHANGE_QUANTITY");
const checkOut = createAction("CHECK_OUT");
const deleteFromOrder = createAction("DELETE_FROM_ORDER");


export { addToCart, deleteFromCart, changeQuantity, checkOut, deleteFromOrder };
