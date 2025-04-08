// src/components/Layout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLaptop } from 'react-icons/fa';
import { FiBarChart2 } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';


export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { mode } = useTheme();

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
        <aside
          style={{
            width: '200px',
            padding: '1rem',
            backgroundColor: 'var(--sidebar-bg)',
            color: 'var(--sidebar-text)'
          }}
        >
        <h2 style={{ fontSize: '1.2rem' }}>CS Foundry</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  to="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: location.pathname === '/' ? 'bold' : 'normal'
                  }}
                >
                  <FiBarChart2 /> Dashboard
                </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link
                to="/devices"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: location.pathname === '/devices' ? 'bold' : 'normal'
                }}
              >
                <FaLaptop /> Devices
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/settings" style={{ fontWeight: location.pathname === '/settings' ? 'bold' : 'normal' }}>
                ⚙️ Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: '2rem' }}>
      <header
        style={{
          marginBottom: '1rem',
          borderBottom: mode === 'dark' ? '1px solid #444' : '1px solid #ccc',
          paddingBottom: '0.5rem',
          backgroundColor: mode === 'dark' ? '#1f1f1f' : '#ffffff',
          color: mode === 'dark' ? '#ffffff' : '#000000'
        }}
      >
        <h1 style={{ fontSize: '1.5rem' }}>VM Deployment Dashboard</h1>
      </header>
        {children}
      </main>
    </div>
  );
};