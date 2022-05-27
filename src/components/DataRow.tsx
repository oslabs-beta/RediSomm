import React from 'react';

const DataRow = ({ data }: { data: string }) => {
  return (
    <div className="data-row">
      <h3>{data}</h3>
    </div>
  );
};

export default DataRow;
