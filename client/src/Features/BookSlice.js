// src/Features/BookSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://localhost:3001";

// Fetch all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${SERVER_URL}/books`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Server error");
  }
});

// Add book
export const addBook = createAsyncThunk("books/addBook", async (book, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${SERVER_URL}/books`, book);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Server error");
  }
});

// Edit book
export const editBook = createAsyncThunk(
  "books/editBook",
  async ({ id, title, author, year }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${SERVER_URL}/books/${id}`, { title, author, year });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// Delete book
export const deleteBook = createAsyncThunk("books/deleteBook", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${SERVER_URL}/books/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Server error");
  }
});

const initialState = {
  books: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetBookState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchBooks.pending, (state) => { state.isLoading = true; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // ADD
      .addCase(addBook.pending, (state) => { state.isLoading = true; })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // EDIT
      .addCase(editBook.pending, (state) => { state.isLoading = true; })
      .addCase(editBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(editBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // DELETE
      .addCase(deleteBook.pending, (state) => { state.isLoading = true; })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetBookState } = bookSlice.actions;
export default bookSlice.reducer;
