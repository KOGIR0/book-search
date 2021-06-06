import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BookSearch from './components/BookSearch';
import {Provider} from 'react-redux';
import {store} from './reducerStorage';

ReactDOM.render(
  <Provider store={store}>
    <BookSearch />
  </Provider>,
  document.getElementById('root')
);
