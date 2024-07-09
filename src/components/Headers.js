import React from 'react';

const Headers = ({ headers }) => {
  if (headers.length < 4) {
    return null; // Return null if headers array doesn't have enough rows
  }

  const [header1] = headers;

  return (
    <div className="text-blue-700 text-sm font-light mb-2">
      {header1.join(', ')}
    </div>
  );
};

export default Headers;
