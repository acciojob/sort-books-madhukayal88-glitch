import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSortBy, setOrder } from '../redux/booksSlice';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, order } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Sorting logic based on current state
  const sortedBooks = [...books].sort((a, b) => {
    let fieldA = (a[sortBy] || '').toString().toLowerCase();
    let fieldB = (b[sortBy] || '').toString().toLowerCase();

    if (fieldA < fieldB) return order === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="books-container">
      <div className="controls">
        {/* Select 1: Sort By Criteria */}
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        {/* Select 2: Sort Order */}
        <select
          value={order}
          onChange={(e) => dispatch(setOrder(e.target.value))}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Books Table */}
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
          {sortedBooks.map((book, index) => (
            <tr key={book.primary_isbn10 || index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13 || book.primary_isbn10 || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
