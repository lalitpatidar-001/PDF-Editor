import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from "react-redux";
import {store} from "./redux/store.js"

/*
  index.js :
    * This is responsible for render App Component 
    * This is Entry Point of application
    * Wrapped by BrowserRoute to provide routing 
    * Wrapped by react-redux Provider to pass store in childrens 
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
