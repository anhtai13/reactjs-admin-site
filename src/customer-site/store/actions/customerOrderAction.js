import { createAction } from "@reduxjs/toolkit";

const placeOrderStart = createAction("PLACE_ORDER_START");
const placeOrderSuccess = createAction("PLACE_ORDER_SUCCESS");
const placeOrderFailure = createAction("PLACE_ORDER_FAILURE");
const resetOrder = createAction("RESET_ORDER");

export { placeOrderStart, placeOrderSuccess, placeOrderFailure, resetOrder };
