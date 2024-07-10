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
      <tr className="bg-gray-200 sticky top-0 z-20">
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
      <tr className="bg-gray-100 sticky top-[2rem] z-10">
        {headers[2].map((header, index) => (
          <th key={index} className="p-2 text-sm text-gray-600">
            {header}
          </th>
        ))}
      </tr>
      {/* Fourth Header Row */}
      <tr className="bg-gray-50 sticky top-[4rem] z-10">
        {headers[3].map((header, index) => (
          <th key={index} className="p-2 text-xs text-gray-500">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default HeaderTable;
