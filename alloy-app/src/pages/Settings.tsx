// src/pages/Settings.tsx
import React from 'react';
import { useDashboardConfig } from '../context/ConfigContext';

// export const Settings: React.FC = () => {
//   const { setConfigFromFile } = useDashboardConfig();

//   return (
//     <div>
//       <h2>⚙️ Settings</h2>
//       <p>Config upload, preferences, and theme selection could go here.</p>

//       <label htmlFor="config-upload" style={{ display: 'block', marginTop: '1rem' }}>
//         Upload Dashboard Config:
//       </label>
//       <input
//         id="config-upload"
//         type="file"
//         accept="application/json"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (file) setConfigFromFile(file);
//         }}
//         style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}
//       />
//     </div>
//   );
// };
export const Settings: React.FC = () => {
  const { setConfigFromFile } = useDashboardConfig();

  return (
    <div
      style={{
        backgroundColor: 'var(--pf-v5-c-page__main-section--BackgroundColor)',
        color: 'var(--pf-v5-global--Color--100)',
        padding: '2rem',
        borderRadius: '0.5rem'
      }}
    >
      <h2>⚙️ Settings</h2>
      <p>Config upload, preferences, and theme selection could go here.</p>

      <label htmlFor="config-upload" style={{ display: 'block', marginTop: '1rem' }}>
        Upload Dashboard Config:
      </label>
      <input
        id="config-upload"
        type="file"
        accept="application/json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setConfigFromFile(file);
        }}
        style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}
      />
    </div>
  );
};
