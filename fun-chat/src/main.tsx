import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('root');

// TODO add assert func
createRoot(root ? root : document.body).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
