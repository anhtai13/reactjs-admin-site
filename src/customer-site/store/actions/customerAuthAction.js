import { createAction } from "@reduxjs/toolkit";

const customerRegister = createAction("CUSTOMER_REGISTER");
const customerLogin = createAction("CUSTOMER_LOGIN");
const customerLogout = createAction("CUSTOMER_LOGOUT");
const customerDelete = createAction("CUSTOMER_DELETE");

export { customerLogout, customerLogin, customerRegister, customerDelete };
