import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { ListWishProvider } from './contexts/ListWishContext';
import { ListProvider } from './contexts/ListContext'
import App from './components/App/App';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
      <ListWishProvider> 
        <ListProvider>
          <App />
        </ListProvider>
      </ListWishProvider>    
    </BrowserRouter>, 
    document.getElementById('root'));