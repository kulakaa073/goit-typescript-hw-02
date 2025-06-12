import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './reset.css';
import 'modern-normalize';
import App from './App.jsx';

import Modal from 'react-modal';
Modal.setAppElement('#root');

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
