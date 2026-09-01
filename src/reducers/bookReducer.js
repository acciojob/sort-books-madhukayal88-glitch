import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SET_SORT_CRITERIA,
  SET_SORT_ORDER
} from '../actions/bookActions';

const initialState = {
  books: [],
  filteredBooks: [],
  loading: false,
  error: null,
  sortCriteria: 'title',
  sortOrder: 'asc'
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
        filteredBooks: action.payload
      };
      
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case SET_SORT_CRITERIA:
      return {
        ...state,
        sortCriteria: action.payload
      };
      
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload
      };
      
    default:
      return state;
  }
};

export default bookReducer;
