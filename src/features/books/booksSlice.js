import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooksApi } from "../../api/booksApi";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBooksApi();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch books");
    }
  }
);

const initialState = {
  books: [],
  sortBy: "title",
  sortOrder: "asc",
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSortBy, setSortOrder } = booksSlice.actions;

export default booksSlice.reducer;
