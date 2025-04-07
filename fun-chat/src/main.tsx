import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { assertIsNonNullable } from '@powwow-js/core';
import { StrictMode } from 'react';

const root = document.querySelector('#root');
assertIsNonNullable(root);
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
