// src/App.tsx
import React from 'react';
//import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { Page, PageSection } from '@patternfly/react-core';
import { Dashboard } from './pages/Dashboard';
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  const { mode } = useTheme();

  return (
    <div className={`pf-theme-${mode}`} style={{ minHeight: '100vh' }}>
      <Page>
        <PageSection isFilled>
          <Dashboard />
        </PageSection>
      </Page>
    </div>
  );
};

export default App;
