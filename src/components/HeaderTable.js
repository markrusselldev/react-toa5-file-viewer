import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const HeaderTable = ({ headers, sortConfig, onSort }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const getIconFor = (name) => {
    if (!sortConfig) {
      return <FaSort />;
    }
    if (sortConfig.key === name) {
      if (sortConfig.direction === 'ascending') {
        return <FaSortUp />;
      } else {
        return <FaSortDown />;
      }
    }
    return <FaSort />;
  };

  if (!headers[1] || !headers[2] || !headers[3]) {
    return null; // Ensure headers are defined before rendering
  }

  return (
    <thead>
      {/* Second Header Row */}
      <tr className="bg-blue-500 text-white sticky top-0 z-10">
        {headers[1].map((header, index) => (
          <th
            key={index}
            onClick={() => onSort(header)}
            className={`p-2 cursor-pointer ${getClassNamesFor(header)}`}
          >
            <div className="flex items-center justify-center">
              {header}
              <span className="ml-1">{getIconFor(header)}</span>
            </div>
          </th>
        ))}
      </tr>
      {/* Third Header Row */}
      <tr className="bg-blue-400 text-blue-900 text-xs sticky top-8 z-10">
        {headers[2].map((header, index) => (
          <th key={index} className="p-2">
            <div className="flex items-center justify-center">
              {header}
            </div>
          </th>
        ))}
      </tr>
      {/* Fourth Header Row */}
      <tr className="bg-blue-300 text-blue-800 text-xs sticky top-16 z-10">
        {headers[3].map((header, index) => (
          <th key={index} className="p-2">
            <div className="flex items-center justify-center">
              {header}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default HeaderTable;
