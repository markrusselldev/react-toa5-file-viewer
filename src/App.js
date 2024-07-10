import React, { useEffect, useState } from 'react';
import HeaderTable from './components/HeaderTable';
import DataTable from './components/DataTable';
import WeatherIndicator from './components/WeatherIndicator';

function App() {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  useEffect(() => {
    fetch('/api/TOA5-example.dat')
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
      sortableData.sort((a, b) => {
        const aValue = a[headers[1].indexOf(sortConfig.key)];
        const bValue = b[headers[1].indexOf(sortConfig.key)];
        
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

  const handleSort = (sortConfig) => {
    setSortConfig(sortConfig);
  };

  return (
    <div className="w-full min-h-screen p-4 font-sans">
      {data.length > 0 && headers.length > 0 && <WeatherIndicator latestData={data[0]} headers={headers[1]} />}
      <div className="w-full max-h-[74vh] overflow-auto border shadow-lg mt-4">
        {headers.length > 0 && (
          <table className="min-w-full table-auto text-xs">
            <HeaderTable headers={headers} sortConfig={sortConfig} onSort={handleSort} />
            <DataTable data={sortedData} />
          </table>
        )}
      </div>
      {headers.length > 0 && (
        <div className="mt-4 text-gray-700">
          <span className="font-bold">Environment: </span>
          {headers[0].join(', ')}
        </div>
      )}
    </div>
  );
}

export default App;
