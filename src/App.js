import React, { useEffect, useState } from 'react';
import Headers from './components/Headers';
import HeaderTable from './components/HeaderTable';
import DataTable from './components/DataTable';

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
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-blue-700">Weather Data</h1>
      <Headers headers={headers} />
      <div className="w-full max-h-[80vh] overflow-auto border shadow-lg">
        <table className="min-w-full table-auto text-xs">
          <HeaderTable headers={headers} sortConfig={sortConfig} onSort={handleSort} />
          <DataTable data={sortedData} />
        </table>
      </div>
    </div>
  );
}

export default App;
