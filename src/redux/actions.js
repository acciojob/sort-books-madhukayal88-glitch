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
      const books = [
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          publisher: "Scribner",
          isbn: "9780743273565",
        },
        {
          title: "1984",
          author: "George Orwell",
          publisher: "Penguin Books",
          isbn: "9780451524935",
        },
        {
          title: "Harry Potter and the Sorcerer's Stone",
          author: "J.K. Rowling",
          publisher: "Scholastic",
          isbn: "9780590353427",
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          publisher: "Harper Perennial",
          isbn: "9780061120084",
        },
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          publisher: "Houghton Mifflin",
          isbn: "9780547928227",
        },
      ];

      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      dispatch(fetchBooksFailure(error.message));
    }
  };
};
