// src/components/ThemeToggle.tsx
import React from 'react';
import { Button } from '@patternfly/react-core';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="secondary">
      {mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </Button>
  );
};
