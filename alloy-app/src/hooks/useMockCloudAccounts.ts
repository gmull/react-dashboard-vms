// src/hooks/useMockCloudAccounts.ts
import { useState, useEffect, useCallback } from 'react';
import { generateRandomAccountStats } from '../utils/mockCloudAccounts';
import { CloudAccountStats } from '../types/cloudAccount';

export const useMockCloudAccounts = (count = 4) => {
  const [data, setData] = useState<CloudAccountStats[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setData(generateRandomAccountStats(count));
      setLoading(false);
    }, 500); // simulate network delay
  }, [count]);

  useEffect(() => {
    refresh(); // auto-run on mount
  }, [refresh]);

  return {
    data,
    loading,
    refresh
  };
};
