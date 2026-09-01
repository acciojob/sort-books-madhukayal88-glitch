import axios from 'axios';

// Action Types
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORT_CRITERIA = 'SET_SORT_CRITERIA';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

// Action Creators
export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error
});

export const setSortCriteria = (criteria) => ({
  type: SET_SORT_CRITERIA,
  payload: criteria
});

export const setSortOrder = (order) => ({
  type: SET_SORT_ORDER,
  payload: order
});

// Async Action to fetch books from NYT API
export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch(fetchBooksRequest());
    try {
      // Note: You need to replace with your actual NYT API key
      // For demo, using a mock API or you can use the NYT API
      const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json', {
        params: {
          'api-key': 'YOUR_NYT_API_KEY_HERE' // Replace with actual API key
        }
      });
      
      // Transform the API response to our book format
      const books = response.data.results.books.map((book, index) => ({
        id: index + 1,
        title: book.title || 'Unknown Title',
        author: book.author || 'Unknown Author',
        publisher: book.publisher || 'Unknown Publisher',
        isbn: book.primary_isbn13 || book.isbns?.[0]?.isbn13 || 'N/A',
        description: book.description || '',
        rank: book.rank || 0
      }));
      
      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      // Fallback mock data for testing if API key is not available
      const mockBooks = [
        { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides', publisher: 'Celadon Books', isbn: '9781250301697' },
        { id: 2, title: 'Where the Crawdads Sing', author: 'Delia Owens', publisher: 'G.P. Putnam\'s Sons', isbn: '9780735219090' },
        { id: 3, title: 'The Midnight Library', author: 'Matt Haig', publisher: 'Viking', isbn: '9780525559474' },
        { id: 4, title: 'The Four Winds', author: 'Kristin Hannah', publisher: 'St. Martin\'s Press', isbn: '9781250178602' },
        { id: 5, title: 'The Vanishing Half', author: 'Brit Bennett', publisher: 'Riverhead Books', isbn: '9780525536291' },
        { id: 6, title: 'The Invisible Life of Addie LaRue', author: 'V.E. Schwab', publisher: 'Tor Books', isbn: '9780765387561' },
        { id: 7, title: 'The Guest List', author: 'Lucy Foley', publisher: 'William Morrow', isbn: '9780062868930' },
        { id: 8, title: 'The Last Thing He Told Me', author: 'Laura Dave', publisher: 'Simon & Schuster', isbn: '9781501171345' },
        { id: 9, title: 'The Song of Achilles', author: 'Madeline Miller', publisher: 'Ecco', isbn: '9780062060624' },
        { id: 10, title: 'Circe', author: 'Madeline Miller', publisher: 'Little, Brown and Company', isbn: '9780316556347' }
      ];
      dispatch(fetchBooksSuccess(mockBooks));
      console.warn('Using mock data. Please add your NYT API key for real data.');
    }
  };
};
