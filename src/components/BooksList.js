import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortBy, setSortOrder } from '../features/booksSlice';

const BooksList = () => {
  const dispatch = useDispatch();
  const { booksList, sortBy, sortOrder, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  // Sorting logic based on selected criterion and order
  const sortedBooks = [...booksList].sort((a, b) => {
    const fieldA = (a[sortBy] || '').toString().toLowerCase();
    const fieldB = (b[sortBy] || '').toString().toLowerCase();

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="container">
      <h2>Book Sorting Application</h2>

      {/* Control Panel targeting Cypress nth-child selectors */}
      <div className="controls">
        {/* select:nth-child(1) */}
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        {/* select:nth-child(2) */}
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading && <p className="loading">Loading books...</p>}
      {error && <p className="error">{error}</p>}

      {/* Books Table */}
      {!loading && !error && (
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
