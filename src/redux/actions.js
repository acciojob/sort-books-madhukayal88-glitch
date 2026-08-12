export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error,
});

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: sortBy,
});

export const setSortOrder = (sortOrder) => ({
  type: SET_SORT_ORDER,
  payload: sortOrder,
});

// Async Action Creator to fetch books
export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch(fetchBooksRequest());
    try {
      // Fetching from New York Times Books API endpoint or standard books API
      const response = await fetch(
        'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=your_api_key'
      );
      const data = await response.json();
      
      // Formatting the API response into required book fields
      const books = (data.results?.books || []).map((book) => ({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        isbn: book.primary_isbn13 || book.isbns?.[0]?.isbn13 || 'N/A',
      }));

      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      dispatch(fetchBooksFailure(error.message));
    }
  };
};
