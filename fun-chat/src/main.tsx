import { createRoot } from 'react-dom/client';
import './index.css';
import { assertIsNonNullable } from '@powwow-js/core';
import App from './App.tsx';
import { StrictMode } from 'react';

const rootElement = document.querySelector('#root');
assertIsNonNullable(rootElement);
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
