"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios.config";
import { toast } from "react-toastify";
import { getValueLocalStorate } from "./hooks";
export const signupAPI = createAsyncThunk("app/signup", async (body) => {
  try {
    const response = await axios.post("/api/signup", body);
    return response.data;
  } catch (err) {
    throw err?.response?.data;
  }
});
export const loginAPI = createAsyncThunk("app/login", async (body) => {
  try {
    const response = await axios.post("/api/login", body);
    return response.data;
  } catch (err) {
    throw err?.response?.data;
  }
});
let userDetails = getValueLocalStorate("userDetails");
console.log("user details ==============>", userDetails);
const initialState = {
  signupState: {
    loading: false,
    errorMessage: "",
    sucess: false,
  },
  loginState: {
    loading: false,
    errorMessage: "",
    sucess: false,
  },
  isAuthonicate: userDetails ? (userDetails?.authToken ? true : false) : false,
  token: userDetails?.authToken ? userDetails?.authToken : null,
  loginUserDetails: userDetails ? userDetails : {},
  selectedRecever: {},
  chatList: [],
  messageList: [],
};

export const counterSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateChatList: (state, action) => {
      state.chatList = action?.payload ? action?.payload : [];
      return state;
    },
    setSelectedUser: (state, action) => {
      state.selectedRecever = action?.payload ? action?.payload : {};
      return state;
    },
    updateMessageList: (state, action) => {
      state.messageList = action?.payload ? action?.payload : [];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupAPI.pending, (state, action) => {
      state.signupState.loading = true;
      return state;
    });
    builder.addCase(signupAPI.rejected, (state, action) => {
      toast.error(
        action?.error ? action?.error?.message : "Please enter valied etails"
      );
      state.signupState.loading = false;
      state.signupState.errorMessage = "Error";
      return state;
    });
    builder.addCase(signupAPI.fulfilled, (state, action) => {
      toast.success("Signup succesfully");
      state.signupState.errorMessage = "";
      state.signupState.sucess = true;
      return state;
    });
    builder.addCase(loginAPI.pending, (state, action) => {
      state.loginState.loading = true;
      return state;
    });
    builder.addCase(loginAPI.rejected, (state, action) => {
      toast.error(
        action?.error ? action?.error?.message : "Please enter valied etails"
      );
      state.loginState.loading = false;
      state.loginState.errorMessage = "Error";
      return state;
    });
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      toast.success("Login succesfully");
      state.loginState.errorMessage = "";
      state.loginState.sucess = true;
      state.isAuthonicate = true;
      state.token = action?.payload?.body?.authToken;
      state.loginUserDetails = action?.payload?.body;
      localStorage.setItem(
        "userDetails",
        JSON.stringify(action?.payload?.body)
      );
      return state;
    });
  },
});
export const { updateChatList, setSelectedUser, updateMessageList } =
  counterSlice.actions;

export default counterSlice.reducer;
