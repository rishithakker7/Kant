import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './pages/pages.css';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';
import './pages/animations.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);