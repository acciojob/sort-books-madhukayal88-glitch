import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setSortCriteria, setSortOrder } from '../actions/bookActions';
import './BooksList.css';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortCriteria, sortOrder } = useSelector((state) => state.books);
  const [sortedBooks, setSortedBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (books.length > 0) {
      const sorted = [...books].sort((a, b) => {
        let aValue = a[sortCriteria]?.toString().toLowerCase() || '';
        let bValue = b[sortCriteria]?.toString().toLowerCase() || '';
        
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
      setSortedBooks(sorted);
    }
  }, [books, sortCriteria, sortOrder]);

  const handleSortCriteriaChange = (e) => {
    dispatch(setSortCriteria(e.target.value));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading books: {error}</p>
        <button onClick={() => dispatch(fetchBooks())}>Retry</button>
      </div>
    );
  }

  return (
    <div className="books-container">
      <h1>Book Sorting App</h1>
      
      <div className="controls">
        <div className="control-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select 
            id="sortBy" 
            value={sortCriteria} 
            onChange={handleSortCriteriaChange}
            className="sort-select"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </div>
        
        <div className="control-group">
          <label htmlFor="sortOrder">Order:</label>
          <select 
            id="sortOrder" 
            value={sortOrder} 
            onChange={handleSortOrderChange}
            className="order-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.length > 0 ? (
              sortedBooks.map((book, index) => (
                <tr key={book.id || index}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.isbn}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-books">No books available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="book-count">
        <p>Total Books: {sortedBooks.length}</p>
        <p>Sorted by: {sortCriteria.charAt(0).toUpperCase() + sortCriteria.slice(1)} ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</p>
      </div>
    </div>
  );
};

export default BooksList;
