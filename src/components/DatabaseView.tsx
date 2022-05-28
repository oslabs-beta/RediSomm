import React from 'react';
import Table from './Table';
import TableAdd from './TableAdd';
import Ticker from './Ticker';

const DatabaseView = () => {
  return (
    <div className="database-view">
      <div className="middle-tables">
        <TableAdd />
        <Table />
      </div>
      <Ticker />
    </div>
  );
};

export default DatabaseView;
