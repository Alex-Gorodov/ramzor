import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.sass';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './store';
import { Popup } from './components/popup/popup';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Popup buttonType='daily-enter'/>
    </Provider>
  </React.StrictMode>
);
