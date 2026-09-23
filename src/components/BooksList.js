import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  setSortBy,
  setSortOrder,
} from "../features/books/booksSlice";
import {
  selectSortedBooks,
  selectSortBy,
  selectSortOrder,
  selectLoading,
  selectError,
} from "../features/books/booksSelectors";
import "./BooksList.css";

function BooksList() {
  const dispatch = useDispatch();

  const books = useSelector(selectSortedBooks);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="books-list">
      <div className="sort-controls">
        <select
          aria-label="Sort By"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <select
          aria-label="Order"
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p role="alert">Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td data-label="Title">{book.title}</td>
              <td data-label="Author">{book.author}</td>
              <td data-label="Publisher">{book.publisher}</td>
              <td data-label="ISBN">{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BooksList;
