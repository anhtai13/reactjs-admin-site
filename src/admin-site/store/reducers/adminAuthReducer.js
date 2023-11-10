import { createReducer } from "@reduxjs/toolkit";

const adminAuthReducer = createReducer(
  { isAuthenticate: false, auth: null },
  {
    ADMIN_LOGIN: (state, action) => {
      window.localStorage.setItem("X-API-Key", action.payload);

      return {
        ...state,
        isAuthenticate: true,
      };
    },
    ADMIN_SET_AUTH: (state, action) => {
      return {
        ...state,
        isAuthenticate: true,
        auth: action.payload,
      };
    },
    ADMIN_LOGOUT: (state, action) => {
      window.localStorage.removeItem("X-API-Key");

      return {
        ...state,
        isAuthenticate: false,
        auth: null,
      };
    },
  }
);

export default adminAuthReducer;
