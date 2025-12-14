import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

// كتب المستخدم
export const fetchBorrowedBooks = createAsyncThunk(
  "borrowed/fetchBorrowedBooks",
  async (username, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ENV.SERVER_URL}/borrowedbooks/${username}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching borrowed books");
    }
  }
);

// كل الكتب للـ admin
export const fetchAllBorrowedBooks = createAsyncThunk(
  "borrowed/fetchAllBorrowedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ENV.SERVER_URL}/borrowedbooks/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching all borrowed books");
    }
  }
);

// إرجاع كتاب
export const returnBook = createAsyncThunk(
  "borrowed/returnBook",
  async ({ _id, rating, feedback }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${ENV.SERVER_URL}/borrowedbooks/return/${_id}`, { rating, feedback });
      return { data: res.data, _id };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error returning book");
    }
  }
);

const borrowedSlice = createSlice({
  name: "borrowed",
  initialState: {
    borrowedBooks: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearSuccessMessage: (state) => { state.successMessage = null; },
  },
  extraReducers: (builder) => {
    builder
      // كتب المستخدم
      .addCase(fetchBorrowedBooks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBorrowedBooks.fulfilled, (state, action) => { state.loading = false; state.borrowedBooks = action.payload; })
      .addCase(fetchBorrowedBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // كل الكتب
      .addCase(fetchAllBorrowedBooks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllBorrowedBooks.fulfilled, (state, action) => { state.loading = false; state.borrowedBooks = action.payload; })
      .addCase(fetchAllBorrowedBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // إرجاع الكتاب
      .addCase(returnBook.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Successfully returned the book!";
        state.borrowedBooks = state.borrowedBooks.filter(b => b._id !== action.payload._id);
      })
      .addCase(returnBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearSuccessMessage } = borrowedSlice.actions;
export default borrowedSlice.reducer;
