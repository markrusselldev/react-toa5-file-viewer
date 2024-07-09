import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const HeaderTable = ({ headers, sortConfig, onSort }) => {
  if (headers.length < 4) {
    return null; // Return null if headers array doesn't have enough rows
  }

  const [, header2, header3, header4] = headers;

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <FaSort />;
    }
    if (sortConfig.direction === 'ascending') {
      return <FaSortUp />;
    }
    return <FaSortDown />;
  };

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    onSort({ key: column, direction });
  };

  return (
    <>
      <thead>
        <tr>
          {header2.map((header, index) => (
            <th
              key={index}
              className="border px-2 py-1 bg-blue-500 text-white text-xs sm:text-sm md:text-base cursor-pointer"
              onClick={() => handleSort(header)}
            >
              <div className="flex items-center justify-between">
                {header}
                {getSortIcon(header)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="bg-blue-200 text-xs text-gray-700">
          {header3.map((header, index) => (
            <td key={index} className="border px-2 py-1">
              {header}
            </td>
          ))}
        </tr>
        <tr className="bg-blue-200 text-xs text-gray-700">
          {header4.map((header, index) => (
            <td key={index} className="border px-2 py-1">
              {header}
            </td>
          ))}
        </tr>
      </tbody>
    </>
  );
};

export default HeaderTable;
