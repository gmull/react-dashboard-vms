// src/utils/mockCloudAccounts.ts
import { CloudAccountStats } from '../types/cloudAccount';

const cloudAccountNames = [
  'AWS Production',
  'AWS Development',
  'Azure Main',
  'GCP Analytics',
  'On-Prem vSphere',
  'Oracle Cloud Sandbox'
];

export const generateRandomAccountStats = (count = 4): CloudAccountStats[] => {
  return cloudAccountNames.slice(0, count).map((account) => {
    const vmsDiscovered = Math.floor(Math.random() * 100) + 10;
    const vmsMigrated = Math.floor(Math.random() * vmsDiscovered);
    const completion = parseFloat(((vmsMigrated / vmsDiscovered) * 100).toFixed(1));

    return {
      cloudAccount: account,
      vmsDiscovered,
      vmsMigrated,
      completion
    };
  });
};
