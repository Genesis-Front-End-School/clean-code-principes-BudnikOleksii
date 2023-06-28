import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeProvider } from './components/layouts/ColorModeContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ColorModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
