import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppContextProvider } from './context/AppContextProvider';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
