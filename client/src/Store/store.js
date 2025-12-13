import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice"; 
import bookReducer from "../Features/BookSlice";
import borrowedReducer from "../Features/BorrowedBookModelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: bookReducer,
    borrowed: borrowedReducer,
  },
});
