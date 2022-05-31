import React, {useEffect, useState} from 'react';
// import DataRow from './DataRow';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
const Table = () => {

  const [rowData, setRowData] = useState([
    {dataKey: 'data1', dataValue: 'value1', dataExpirationTime: null, status: 'Not Expired', dataType: 'string', size: 8},
    {dataKey: 'data2', dataValue: 'value2', dataExpirationTime: 1003, status: 'Not Expired', dataType: 'string', size: 32},
    {dataKey: 'data3', dataValue: 'value3', dataExpirationTime: null, status: 'Expired', dataType: 'string', size: 16}
  ])
  const [columnDefs, setColumnDefs] = useState([
    {field: 'dataKey'},
    {field: 'dataValue'},
    {field: 'dataExpirationTime'},
    //just testing;
    {field:'status'},
    {field: 'dataType'},
    {field: 'size'},
    // {field: 'keyspace misses'},
    // {field: 'Added'},
    // {field: 'del'},
  ])

  return (
    <div className="table main-table ag-theme-alpine-dark">
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
