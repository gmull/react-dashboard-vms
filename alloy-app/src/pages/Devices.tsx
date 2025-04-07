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
  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [filterFields, setFilterFields] = useState<string[]>([]);

  useEffect(() => {
    fetch('/mock/devices.json')
      .then(res => res.json())
      .then(data => {
        setDevices(data);
        const uniquePlatforms = [...new Set(data.map((d: Device) => d.platform_name))];
        setPlatforms(uniquePlatforms);
      })
      .catch(console.error);
  }, []);

  const normalize = (value: string) => value.trim().toLowerCase();

  const filteredDevices = devices.filter(device => {
    const matchesSearch = Object.values(device).some(value =>
      normalize(String(value)).includes(normalize(search))
    );

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      return value === '' || normalize((device as any)[key]).includes(normalize(value));
    });

    return matchesSearch && matchesFilters;
  });

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pagedDevices = filteredDevices.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(filteredDevices.length / PAGE_SIZE);

  const addFilterField = () => {
    const allFields = ['platform_name', 'status', 'agent_version'];
    const available = allFields.find(field => !filterFields.includes(field));
    if (available) {
      setFilterFields([...filterFields, available]);
      setFilters(prev => ({ ...prev, [available]: '' }));
    }
  };

  const clearFilters = () => {
    setSearch('');
    setFilters({});
    setFilterFields([]);
    setCurrentPage(1);
  };

  return (
    <div style={{
      backgroundColor: 'var(--pf-v5-c-page__main-section--BackgroundColor)',
      color: 'var(--pf-v5-global--Color--100)',
      padding: '1rem',
      borderRadius: '0.5rem',
      transition: 'background-color 0.2s ease, color 0.2s ease'
    }}>
      <h2>💻 Connected Devices</h2>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <label>Saved filters (placeholder)</label>
          <select disabled style={{ padding: '0.5rem', minWidth: '150px' }}>
            <option>None</option>
          </select>
        </div>
        <div>
          <label>Search all fields</label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            style={{ padding: '0.5rem', minWidth: '200px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={addFilterField} style={{ padding: '0.5rem' }}>＋ Add Filters</button>
          <button onClick={clearFilters} style={{ padding: '0.5rem' }}>🧹 Clear All</button>
        </div>
      </div>

      {filterFields.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {filterFields.map((field, index) => (
            <div key={index}>
              <label>Filter by {field.replace('_', ' ')}</label>
              <input
                type="text"
                value={filters[field] || ''}
                onChange={(e) => {
                  setFilters(prev => ({ ...prev, [field]: e.target.value }));
                  setCurrentPage(1);
                }}
                placeholder={`Filter by ${field}`}
                style={{ padding: '0.5rem', minWidth: '150px' }}
              />
            </div>
          ))}
        </div>
      )}

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