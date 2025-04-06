// src/types/cloudAccount.ts
export interface CloudAccountStats {
    cloudAccount: string;
    vmsDiscovered: number;
    vmsMigrated: number;
    completion: number; // in percentage
  }
  