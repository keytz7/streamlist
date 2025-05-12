import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PWAPrompt from 'react-ios-pwa-prompt'
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "676625895619-vovg6o7i4qpjv5quuim78i65g02j75o7.apps.googleusercontent.com"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
    <PWAPrompt copyTitle="Download the App"/>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
