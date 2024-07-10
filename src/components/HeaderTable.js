import React from 'react';

const HeaderTable = ({ headers, sortConfig, onSort }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  if (!headers[1] || !headers[2] || !headers[3]) {
    return null; // Ensure headers are defined before rendering
  }

  return (
    <thead>
      {/* Second Header Row */}
      <tr className="bg-blue-500 text-white">
        {headers[1].map((header, index) => (
          <th
            key={index}
            onClick={() => onSort({ key: header, direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}
            className={`p-2 ${getClassNamesFor(header)}`}
          >
            {header}
          </th>
        ))}
      </tr>
      {/* Third Header Row */}
      <tr className="bg-blue-400 text-blue-900 text-xs">
        {headers[2].map((header, index) => (
          <th key={index} className="p-2">
            {header}
          </th>
        ))}
      </tr>
      {/* Fourth Header Row */}
      <tr className="bg-blue-300 text-blue-800 text-xs">
        {headers[3].map((header, index) => (
          <th key={index} className="p-2">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default HeaderTable;
