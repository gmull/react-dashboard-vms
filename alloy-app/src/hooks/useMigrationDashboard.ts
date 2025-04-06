// src/hooks/useMigrationDashboard.ts
import { useEffect, useState } from 'react';
import { migrationSummary, cloudAccountData } from '../data/migrationDashboardData';

export const useMigrationDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [cloudData, setCloudData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(res => setTimeout(res, 500)); // simulate network delay
      setSummary(migrationSummary);
      setCloudData(cloudAccountData);
    };
    fetchData();
  }, []);

  return { summary, cloudData };
};
