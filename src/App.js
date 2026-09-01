import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import BooksList from './components/BooksList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Book Sorting App</h1>
        <BooksList />
      </div>
    </Provider>
  );
}

export default App;
