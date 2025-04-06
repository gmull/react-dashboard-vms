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

export const Dashboard: React.FC = () => {
  const { summary } = useMigrationDashboard();

  return (
    <>
      {/* Header Section */}
      <PageSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title headingLevel="h1">CS Foundry Migration Dashboard</Title>
          <ThemeToggle />
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
            title="Target VMs"
            value={summary?.targetVms ?? '–'}
            donutValue={summary?.targetVms}
            donutTotal={summary?.targetVms}
            subtitle="Total migration scope"
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
