import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { GoogleOAuthProvider } from '@react-oauth/google';
import 'tw-elements';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  //<GoogleOAuthProvider clientId='179339420318-9u0mmam0da7170glp0mk8plnbilsg97a.apps.googleusercontent.com'>

    <Provider store={store}>
      <App />
    </Provider>
  
 // </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
