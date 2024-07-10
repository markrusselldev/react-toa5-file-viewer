import React from 'react';

const DataTable = ({ data }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex} className="px-2 py-1 text-blue-900 text-xs w-auto whitespace-nowrap text-center">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default DataTable;
