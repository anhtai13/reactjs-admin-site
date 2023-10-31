import { createReducer } from "@reduxjs/toolkit";

const users =
  // window.localStorage.getItem("userList")
  //   ? JSON.parse(window.localStorage.getItem("userList"))
  //   :
  [
    {
      id: 1,
      email: "user@gmail.com",
      password: btoa("user"),
      role: "user",
    },
    {
      id: 2,
      email: "user1@gmail.com",
      password: btoa("user"),
      role: "user",
    },
  ];

const userProducer = createReducer(
  { users: users },
  {
    ADMIN_DELETE_USER: (state, action) => {
      let newList = state.users.filter((user) => user.id === action.payload.id);

      // localStorage.setItem("userList", JSON.stringify(newList));
      return { ...state, users: newList };
    },
  }
);

export default userProducer;
