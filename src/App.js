import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BooksList from './components/BooksList';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BooksList />
      </div>
    </Provider>
  );
}

export default App;
