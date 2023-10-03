import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import initializeFirebase from "./firebase";

console.log(initializeFirebase);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
