import React from 'react';
import DataRow from './DataRow';

const Ticker = () => {
  return (
    <div className="ticker-container">
      <div className="ticker-name">Ticker</div>
      <div className="table ticker-table">
        <DataRow dataKey="Key1" dataValue="value1" dataTTL={5} />
        <DataRow dataKey="Key2" dataValue="value2" dataTTL={6} />
        <DataRow dataKey="Key3" dataValue="value3" />
      </div>
    </div>
  );
};

export default Ticker;
