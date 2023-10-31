import { createReducer } from "@reduxjs/toolkit";

const listOrder = [{ code: "VH0011", nameProduct: "A" }];

const orderAdReduecer = createReducer({ orders: listOrder }, {});

export default orderAdReduecer;
