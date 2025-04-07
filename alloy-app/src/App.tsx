// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Page, PageSection } from '@patternfly/react-core';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Devices } from './pages/Devices';
import { Settings } from './pages/Settings';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  const { mode } = useTheme(); // 'light' | 'dark'

  return (
    <div className={`pf-theme-${mode}`}> {/* 👈 Applies .pf-theme-light or .pf-theme-dark */}
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
