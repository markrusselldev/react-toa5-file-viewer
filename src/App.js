import React, { useEffect, useState } from 'react';
import HeaderTable from './components/HeaderTable';
import DataTable from './components/DataTable';
import WeatherIndicator from './components/WeatherIndicator';

function App() {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  useEffect(() => {
    fetch('/api/SkiSF_MetData.dat')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const headerLines = lines.slice(0, 4).map(line => line.replace(/['"]+/g, '').split(','));
        const dataLines = lines.slice(4)
          .filter(line => line.trim() !== '')
          .map(line => line.split(',').map(item => item.replace(/['"]+/g, '')));

        if (headerLines.length === 4) {
          setHeaders(headerLines); // Capturing all four header rows
        } else {
          console.error('Incorrect header lines count:', headerLines.length);
        }

        setData(dataLines.reverse()); // Reversing the order of data rows
      })
      .catch(error => console.error('Error reading file:', error));
  }, []);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      const columnIndex = headers[1].indexOf(sortConfig.key);

      sortableData.sort((a, b) => {
        let aValue = a[columnIndex];
        let bValue = b[columnIndex];

        // Attempt to parse as dates first
        let aDate = Date.parse(aValue);
        let bDate = Date.parse(bValue);

        if (!isNaN(aDate) && !isNaN(bDate)) {
          aValue = new Date(aDate);
          bValue = new Date(bDate);
        } else {
          // Attempt to parse as numbers
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);

          // If parseFloat fails (returns NaN), treat as strings
          if (isNaN(aValue)) {
            aValue = a[columnIndex];
          }
          if (isNaN(bValue)) {
            bValue = b[columnIndex];
          }
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, headers, sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full min-h-screen p-4 font-sans">
      {data.length > 0 && headers.length > 0 && <WeatherIndicator latestData={data[0]} headers={headers[1]} />}
      <div className="w-full h-[74vh] overflow-x-auto overflow-y-auto border shadow-lg mt-4">
        {headers.length > 0 && (
          <div className="overflow-x-auto h-full">
            <table className="min-w-full table-auto text-xs">
              <HeaderTable headers={headers} sortConfig={sortConfig} onSort={handleSort} />
              <DataTable data={sortedData} />
            </table>
          </div>
        )}
      </div>
      {headers.length > 0 && (
        <div className="mt-4 text-gray-500 text-sm sm:text-xs">
          <span className="font-bold">Environment: </span>
          {headers[0].join(', ')}
        </div>
      )}
    </div>
  );
}

export default App;
