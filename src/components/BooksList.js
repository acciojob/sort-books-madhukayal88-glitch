import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSortBy, setSortOrder } from '../redux/actions';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, sortOrder } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Sorting Logic
  const sortedBooks = [...books].sort((a, b) => {
    const key = sortBy.toLowerCase();
    const valA = (a[key] || '').toString().toLowerCase();
    const valB = (b[key] || '').toString().toLowerCase();

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Book Sorting App</h1>

      {/* Control Panel: Select dropdowns matching Cypress selectors */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {/* select:nth-child(1) */}
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        {/* select:nth-child(2) */}
        <select
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Books Table */}
      {!loading && !error && (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
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
              <tr key={book.isbn + index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksList;
