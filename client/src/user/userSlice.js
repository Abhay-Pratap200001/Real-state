import { createSlice } from "@reduxjs/toolkit";
import SignIn from "../pages/SignIn";
import { act } from "react";

const initialState = {
  // default value of states
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  // creating slice
  name: "user", // name of slice
  initialState, // default staring value
  reducers: {
    // fuction to update state

    SignInStart: (state) => {
      // sets signIn loading to true.
      state.loading = true;
    },

    SignInSuccess: (state, action) => {
      //saves user data and clears error
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    SignInFaliure: (state, action) => {
      //saves error and stops loading
      state.error = action.payload;
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

     deleteUserStart: (state) => {
     state.loading = true;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

      signOutUserStart: (state) => {
     state.loading = true;
    },

    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  SignInStart,
  SignInSuccess,
  SignInFaliure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} = userSlice.actions;

export default userSlice.reducer;
