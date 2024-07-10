import React, { useEffect, useState } from 'react';
import CurrentConditions from './components/CurrentConditions';
import RecentTrends from './components/RecentTrends';
import FullDataTable from './components/FullDataTable';

function App() {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [showFullData, setShowFullData] = useState(false);

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

  const toggleFullData = () => {
    setShowFullData(!showFullData);
  };

  return (
    <div className="w-full min-h-screen p-4 font-sans">
      {data.length > 0 && headers.length > 0 && (
        <>
          <CurrentConditions latestData={data[0]} headers={headers[1]} />
          <RecentTrends data={data.slice(0, 12)} headers={headers[1]} />
          <div className="flex items-center justify-between mt-4">
            <div className="text-gray-500 text-sm">
              <strong>Environment:</strong> {headers[0].join(', ')}
            </div>
            <button
              onClick={toggleFullData}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {showFullData ? 'Hide Full Data' : 'Show Full Data'}
            </button>
          </div>
          {showFullData && <FullDataTable data={data} headers={headers} />}
        </>
      )}
    </div>
  );
}

export default App;
