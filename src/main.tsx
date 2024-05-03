import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AudioProvider } from './context/AudioProvider';
import { ModalProvider } from './context/ModalProvider.tsx';
import { CelestialBodyProvider } from './context/CelestialBodyProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioProvider>
      <ModalProvider>
        <CelestialBodyProvider>
          <App />
        </CelestialBodyProvider>
      </ModalProvider>
    </AudioProvider>
  </React.StrictMode>
);
