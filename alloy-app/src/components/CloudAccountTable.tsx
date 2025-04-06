// src/components/CloudAccountTable.tsx
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  Tbody,
  Tr,
  Th,
  Td,
  Thead
} from '@patternfly/react-table';

// New
// const columns = ['Account Name', 'Provider', 'Status'];

// const rows = [
//   ['Dev Account', 'AWS', 'Active'],
//   ['Prod Account', 'Azure', 'Inactive'],
//   ['Test Account', 'GCP', 'Pending']
// ];

// Old
import { Button } from '@patternfly/react-core';
import { useMockCloudAccounts } from '../hooks/useMockCloudAccounts';

// New
// export const CloudAccountTable: React.FC = () => {
//   return (
//     <div style={{ overflowX: 'auto' }}>
//       <table className="pf-c-table pf-m-grid-md pf-m-compact" role="grid" style={{ width: '100%' }}>
//         <Thead>
//           <Tr>
//             {columns.map((col, idx) => (
//               <Th key={idx}>{col}</Th>
//             ))}
//           </Tr>
//         </Thead>
//         <Tbody>
//           {rows.map((row, rowIndex) => (
//             <Tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <Td key={cellIndex}>{cell}</Td>
//               ))}
//             </Tr>
//           ))}
//         </Tbody>
//       </table>
//     </div>
//   );
// };

// Old
// export const CloudAccountTable: React.FC = () => {
//   const { data, loading, refresh } = useMockCloudAccounts(5);

//   return (
//     <div>
//       <Button onClick={refresh} isDisabled={loading} className="mb-3">
//         {loading ? 'Refreshing...' : 'Refresh Data'}
//       </Button>

//       <Table aria-label="Cloud Account Table" variant="compact">
//         <Thead>
//           <Tr>
//             <Th>Cloud Account</Th>
//             <Th>VMs Discovered</Th>
//             <Th>VMs Migrated</Th>
//             <Th>Completion %</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {data.map((account, idx) => (
//             <Tr key={idx}>
//               <Td>{account.cloudAccount}</Td>
//               <Td>{account.vmsDiscovered}</Td>
//               <Td>{account.vmsMigrated}</Td>
//               <Td>{account.completion}%</Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </div>
//   );
// };

// Proposed Fix
export const CloudAccountTable: React.FC = () => {
  const { data, loading, refresh } = useMockCloudAccounts(5);

  return (
    <div>
      <Button onClick={refresh} isDisabled={loading} className="mb-3">
        {loading ? 'Refreshing...' : 'Refresh Data'}
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
              <th>VMs Discovered</th>
              <th>VMs Migrated</th>
              <th>Completion %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((account, idx) => (
              <tr key={idx}>
                <td>{account.cloudAccount}</td>
                <td>{account.vmsDiscovered}</td>
                <td>{account.vmsMigrated}</td>
                <td>{account.completion}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};