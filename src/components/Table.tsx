import React, {useEffect, useState} from 'react';
// import DataRow from './DataRow';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
const Table = () => {

  const [rowData, setRowData] = useState([
    
  ])
  const [columnDefs, setColumnDefs] = useState([
    {field: 'dataKey'},
    {field: 'dataValue'},
    {field: 'dataExpirationTime'},
  ])

  return (
    <div className="table main-table">
     <AgGridReact 
      rowData={rowData}
      columnDefs={columnDefs}
     />
    </div>
  );
};

export default Table;

// export type ExpirationTimeType = (string | null);
// export type DataRowType = {
//   dataKey: string;
//   dataValue: string;
//   dataExpirationTime: ExpirationTimeType;
//   dataType: string;
//   dataIsExpired: boolean;

// }

// const fakeData : DataRowType[] = [
//   {dataKey: "data1", dataValue: "value1", dataExpirationTime: null, dataType: "string", dataIsExpired: false},
//   {dataKey: "data2", dataValue: "value2", dataExpirationTime: "september", dataType: "string", dataIsExpired: false}
// ]
