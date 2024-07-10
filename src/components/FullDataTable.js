import React from 'react';
import HeaderTable from './HeaderTable';
import DataTable from './DataTable';

const FullDataTable = ({ data, headers }) => {
  return (
    <div className="w-full overflow-x-auto overflow-y-auto border shadow-lg mt-4 max-h-[50vh]">
      {headers.length > 0 && (
        <div className="overflow-x-auto h-full">
          <table className="min-w-full table-auto text-xs">
            <HeaderTable headers={headers} />
            <DataTable data={data} />
          </table>
        </div>
      )}
    </div>
  );
};

export default FullDataTable;
