import axios from 'axios';

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

// Using a public books API (Open Library) as NYT requires API key
export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });
    try {
      const response = await axios.get(
        'https://openlibrary.org/search.json?q=javascript&limit=20'
      );

      const books = response.data.docs.map((book) => ({
        title: book.title || 'Unknown Title',
        author: book.author_name ? book.author_name[0] : 'Unknown Author',
        publisher: book.publisher ? book.publisher[0] : 'Unknown Publisher',
        isbn: book.isbn ? book.isbn[0] : 'N/A',
      }));

      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
    }
  };
};

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: sortBy,
});

export const setSortOrder = (order) => ({
  type: SET_SORT_ORDER,
  payload: order,
});
