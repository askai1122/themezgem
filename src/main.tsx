import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global resilience: automatically recover any image loading error to eliminate glitches
window.addEventListener(
  'error',
  (event) => {
    const target = event.target as HTMLElement | null;
    if (target && target.tagName === 'IMG') {
      const img = target as HTMLImageElement;
      if (!img.dataset.fallbackApplied) {
        img.dataset.fallbackApplied = 'true';
        img.src = '/images/food/single-mez.jpg';
      }
    }
  },
  true
);

createRoot(document.getElementById('root')!).render(<App />);
