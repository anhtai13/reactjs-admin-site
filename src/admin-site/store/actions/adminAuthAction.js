import { createAction } from "@reduxjs/toolkit";

const adminAuthLogin = createAction("ADMIN_LOGIN");
const setAdminAuth = createAction("ADMIN_SET_AUTH");
const adminAuthLogout = createAction("ADMIN_LOGOUT");

export { adminAuthLogin, adminAuthLogout, setAdminAuth };
