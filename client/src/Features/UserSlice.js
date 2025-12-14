import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config"; // 🔹 استيراد config

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ fullName, username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/register`, { 
        fullName,
        username,
        password,
      });

      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }

      return { username, fullName, role: "student" };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);


const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
