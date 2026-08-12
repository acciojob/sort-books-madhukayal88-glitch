export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const SET_SORT_BY = "SET_SORT_BY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

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

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch(fetchBooksRequest());

    try {
      const response = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();

      const books = (data.results?.books || []).map((book) => ({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        isbn: book.primary_isbn13 || "N/A",
      }));

      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      dispatch(fetchBooksFailure(error.message));
    }
  };
};
