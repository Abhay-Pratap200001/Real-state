import { createSlice } from "@reduxjs/toolkit";
import SignIn from "../pages/SignIn";
import { act } from "react";

const initialState = { // default value of states 
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({// creating slice
  name: "user", // name of slice
  initialState, // default staring value
  reducers: {  // fuction to update state


    SignInStart: (state) => {// sets signIn loading to true.
      state.loading = true;
    },


    SignInSuccess: (state, action) => { //saves user data and clears error
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },


    SignInFaliure: (state, action) => { //saves error and stops loading
      state.error = action.payload;
      state.loading = false;
    },

  },
});


export const { SignInStart, SignInSuccess, SignInFaliure } = userSlice.actions;
export default userSlice.reducer;
