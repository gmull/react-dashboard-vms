// src/pages/Devices.tsx
import React, { useEffect, useState } from 'react';

interface Device {
  service_provider: string;
  service_provider_account_id: string;
  hostname: string;
  platform_name: string;
  status: string;
  agent_version: string;
}

const PAGE_SIZE = 25;

export const Devices: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    service_provider_account_id: '',
    hostname: '',
    platform_name: '',
    status: '',
    agent_version: ''
  });

  useEffect(() => {
    // Mock API call
    fetch('/mock/devices.json')
      .then(res => res.json())
      .then(setDevices)
      .catch(console.error);
  }, []);

  const normalize = (value: string) => value.trim().toLowerCase();

  const filteredDevices = devices.filter(device =>
    normalize(device.service_provider_account_id).includes(normalize(filters.service_provider_account_id)) &&
    normalize(device.hostname).includes(normalize(filters.hostname)) &&
    normalize(device.platform_name).includes(normalize(filters.platform_name)) &&
    normalize(device.status).includes(normalize(filters.status)) &&
    normalize(device.agent_version).includes(normalize(filters.agent_version))
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedDevices = filteredDevices.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(filteredDevices.length / PAGE_SIZE);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value.trim() }));
    setCurrentPage(1);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--pf-v5-c-page__main-section--BackgroundColor)',
        color: 'var(--pf-v5-global--Color--100)',
        padding: '1rem',
        borderRadius: '0.5rem',
        transition: 'background-color 0.2s ease, color 0.2s ease'
      }}
    >
      <h2>💻 Connected Devices</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filter by account ID..."
          value={filters.service_provider_account_id}
          onChange={(e) => updateFilter('service_provider_account_id', e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Filter by hostname..."
          value={filters.hostname}
          onChange={(e) => updateFilter('hostname', e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Filter by platform..."
          value={filters.platform_name}
          onChange={(e) => updateFilter('platform_name', e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Filter by status..."
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Filter by agent version..."
          value={filters.agent_version}
          onChange={(e) => updateFilter('agent_version', e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--pf-v5-c-table__th--BackgroundColor)' }}>
            <th style={{ color: 'var(--pf-v5-global--Color--100)' }}>Service Provider</th>
            <th style={{ color: 'var(--pf-v5-global--Color--100)' }}>Account ID</th>
            <th style={{ color: 'var(--pf-v5-global--Color--100)' }}>Hostname</th>
            <th style={{ color: 'var(--pf-v5-global--Color--100)' }}>Platform</th>
            <th style={{ color: 'var(--pf-v5-global--Color--100)' }}>Status</th>
            <th style={{ color: 'var(--pf-v5-global--Color--100)' }}>Agent Version</th>
            <th style={{ color: 'var(--pf-v5-global--Color--100)' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pagedDevices.map((device, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid var(--pf-v5-global--BorderColor)' }}>
              <td>{device.service_provider}</td>
              <td>{device.service_provider_account_id}</td>
              <td>{device.hostname}</td>
              <td>{device.platform_name}</td>
              <td>{device.status}</td>
              <td>{device.agent_version}</td>
              <td><a href="#">Migrate</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredDevices.length > PAGE_SIZE && (
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};