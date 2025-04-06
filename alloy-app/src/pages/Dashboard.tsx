// src/pages/Dashboard.tsx
import React from 'react';
import {
  PageSection,
  Gallery,
  Title
} from '@patternfly/react-core';

import { useMigrationDashboard } from '../hooks/useMigrationDashboard';
import { SummaryCard } from '../components/SummaryCard';
import { CloudAccountTable } from '../components/CloudAccountTable';
import { ThemeToggle } from '../components/ThemeToggle';
import { useDashboardConfig } from '../context/ConfigContext';

export const Dashboard: React.FC = () => {
  const { summary } = useMigrationDashboard();
  const { config, setConfigFromFile } = useDashboardConfig(); // ✅ Moved inside component

  return (
    <>
      {/* Header Section */}
      <PageSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title headingLevel="h1">{config.title}</Title>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="file"
              accept="application/json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setConfigFromFile(file);
              }}
              style={{ fontSize: '0.9rem' }}
            />
            <ThemeToggle />
          </div>
        </div>
      </PageSection>

      {/* Donut Summary Section */}
      <PageSection>
        <Gallery hasGutter>
          <SummaryCard
            title="VMs Discovered"
            value={summary?.vmsDiscovered ?? '–'}
            donutValue={summary?.vmsDiscovered}
            donutTotal={summary?.targetVms}
            subtitle={`of ${summary?.targetVms ?? '–'} VMs targeted`}
          />
          <SummaryCard
            title="VMs Migrated"
            value={summary?.vmsMigrated ?? '–'}
            donutValue={summary?.vmsMigrated ?? 0}
            donutTotal={summary?.targetVms ?? 1}
            subtitle={`of ${summary?.targetVms ?? '–'} target VMs`}
          />
        </Gallery>
      </PageSection>

      {/* Table Section */}
      <PageSection>
        <CloudAccountTable />
      </PageSection>
    </>
  );
};
