
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReviewReceived from './ReviewReceived';
import './index.css';

const Page = location.pathname === '/review' ? ReviewReceived : App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
