import React, { createContext, useContext, useState } from 'react';

export interface DashboardConfig {
  title: string;
  cloudAccounts: {
    provider: string;
    accounts: string[];
  }[];
}

const defaultConfig: DashboardConfig = {
  title: 'CS Foundry Migration Dashboard',
  cloudAccounts: [
    { provider: 'AWS', accounts: ['AWS Production', 'AWS Development'] },
    { provider: 'Azure', accounts: ['Azure Main'] },
    { provider: 'GCP', accounts: ['GCP Analytics'] },
    { provider: 'On-Prem', accounts: ['On-Prem vSphere'] }
  ]
};

const ConfigContext = createContext<{
  config: DashboardConfig;
  setConfigFromFile: (file: File) => void;
}>({
  config: defaultConfig,
  setConfigFromFile: () => {}
});

export const useDashboardConfig = () => useContext(ConfigContext);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<DashboardConfig>(defaultConfig);

  const setConfigFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        setConfig(json);
      } catch (e) {
        alert('Invalid JSON config file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <ConfigContext.Provider value={{ config, setConfigFromFile }}>
      {children}
    </ConfigContext.Provider>
  );
};
