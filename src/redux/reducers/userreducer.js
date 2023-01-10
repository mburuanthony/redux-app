import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("authenticated"),
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /*function to register a user*/
    registerUser: (state, action) => {
      const { fName, lName, email, password } = action.payload;

      const newuser = {
        fisrtName: fName,
        lastName: lName,
        email: email,
        password: password,
      };

      const users = localStorage.getItem("users") ?? [];

      // eslint-disable-next-line
      const parsedUsers = users.length == 0 ? users : JSON.parse(users);
      parsedUsers.push(newuser);

      localStorage.setItem("users", JSON.stringify(parsedUsers));
      localStorage.setItem("authenticated", true);

      return {
        ...state,
        isAuthenticated: true,
        user: { fisrtName: fName, lastName: lName, email: email },
      };
    },
    /*function to login a user*/
    userLogin: (state, action) => {
      const { email, password } = action.payload;

      const users = localStorage.getItem("users");

      const selected_user = JSON.parse(users).filter(
        // eslint-disable-next-line
        (user) => user?.email == email && user?.password == password
      );

      localStorage.setItem("authenticated", true);

      return {
        ...state,
        isAuthenticated: true,
        user: {
          fisrtName: selected_user[0]?.fName,
          lastName: selected_user[0]?.lName,
          email: selected_user[0]?.email,
        },
      };
    },
    /*function to log out user*/
    userLogOut: (state) => {
      localStorage.setItem("authenticated", false);

      return { ...state, isAuthenticated: false, user: {} };
    },
  },
});

export const { registerUser, userLogin, userLogOut } = userSlice.actions;

export default userSlice.reducer;
