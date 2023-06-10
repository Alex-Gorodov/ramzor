import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.sass';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.onbeforeunload = function () {
  window.scrollTo(0,0);
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
