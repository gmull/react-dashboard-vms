// src/components/CloudAccountTable.tsx
import React from 'react';
import { Button } from '@patternfly/react-core';
import { useDashboardConfig } from '../context/ConfigContext';

export const CloudAccountTable: React.FC = () => {
  const { config } = useDashboardConfig();

  // Flatten providers + accounts into a usable table
  const data = config.cloudAccounts.flatMap(({ provider, accounts }) =>
    accounts.map((account) => ({
      cloudAccount: `${account}`,
      provider,
      vmsDiscovered: Math.floor(Math.random() * 150),
      vmsMigrated: Math.floor(Math.random() * 50),
    }))
  );

  return (
    <div>
      <Button
        onClick={() => window.location.reload()}
        className="mb-3"
      >
        Refresh Data
      </Button>

      <div className="pf-c-table-container" style={{ overflowX: 'auto' }}>
        <table
          className="pf-c-table pf-m-compact pf-m-grid-md"
          role="grid"
          aria-label="Cloud Account Table"
          style={{ width: '100%' }}
        >
          <thead>
            <tr>
              <th>Cloud Account</th>
              <th>Provider</th>
              <th>VMs Discovered</th>
              <th>VMs Migrated</th>
              <th>Completion %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((account, idx) => {
              const percent = account.vmsDiscovered
                ? ((account.vmsMigrated / account.vmsDiscovered) * 100).toFixed(1)
                : '0.0';
              return (
                <tr key={idx}>
                  <td>{account.cloudAccount}</td>
                  <td>{account.provider}</td>
                  <td>{account.vmsDiscovered}</td>
                  <td>{account.vmsMigrated}</td>
                  <td>{percent}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
