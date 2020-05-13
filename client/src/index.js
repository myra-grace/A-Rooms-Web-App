import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import AppProvider from './components/AppContext';
import App from './components/App';

import configureStore from './store';

const store = configureStore();

// // TODO: Replace the following with your app's Firebase project configuration
// var firebaseConfig = {
//   // ...
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// npm install -g firebase-tools

ReactDOM.render(
  // <AppProvider>
    <Provider store={store}>
      <App />
      <script src="/__/firebase/7.14.3/firebase-app.js"></script>
      <script src="/__/firebase/7.14.3/firebase-auth.js"></script>
      <script src="/__/firebase/7.14.3/firebase-storage.js"></script>
      <script src="/__/firebase/7.14.3/firebase-analytics.js"></script>
      <script src="/__/firebase/init.js"></script>
    </Provider>,
  // </AppProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
