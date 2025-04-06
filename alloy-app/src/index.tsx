// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './styles/theme.css'; // Global theme styles
import '@patternfly/react-core/dist/styles/base.css'; // PatternFly styles
import { ConfigProvider } from './context/ConfigContext'; // Import Config

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </ThemeProvider>
);
