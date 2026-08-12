import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BooksList from './components/BooksList';

function App() {
  return (
    <Provider store={store}>
      <BooksList />
    </Provider>
  );
}

export default App;
