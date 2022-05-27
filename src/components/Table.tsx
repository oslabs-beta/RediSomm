import React from 'react';
import DataRow from './DataRow';

const Table = () => {
  return (
    <div className="table main-table">
      <DataRow data="1" />
      <DataRow data="2" />
      <DataRow data="3" />
    </div>
  );
};

export default Table;
