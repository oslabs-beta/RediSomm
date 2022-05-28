import React from 'react';

export type DataRow = {
  dataKey: string;
  dataValue: string;
  dataTTL?: number | typeof Infinity;
};

const DataRow = ({ dataKey, dataValue, dataTTL = Infinity }: DataRow) => {
  return (
    <div className="data-row">
      <h3>{dataKey + ':' + dataValue + ':' + dataTTL}</h3>
    </div>
  );
};

export default DataRow;
