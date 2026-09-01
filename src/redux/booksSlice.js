import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch books from NYT Books API
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=your_api_key'
      );
      const data = await response.json();
      return data.results.books;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
    sortBy: 'title', // Default: 'title' | 'author' | 'publisher'
    order: 'asc',    // Default: 'asc' | 'desc'
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
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
        state.error = action.payload || 'Failed to fetch books';
      });
  },
});

export const { setSortBy, setOrder } = booksSlice.actions;
export default booksSlice.reducer;
