import React from 'react';

const TableAdd = () => {
  return (
    <div className="add-new-row">
      <input placeholder="key" className="entry"></input>
      <input placeholder="value" className="entry"></input>
      <input placeholder="TTL" className="entry"></input>
      <button>click me</button>
    </div>
  );
};

export default TableAdd;
