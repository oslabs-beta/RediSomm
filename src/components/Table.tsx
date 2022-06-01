import React, {useEffect, useState, useMemo, useRef} from 'react';
// import DataRow from './DataRow';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { GridApi } from 'ag-grid-community';
import { application } from 'express';
import { GridBodyScrollFeature } from 'ag-grid-community/dist/lib/gridBodyComp/gridBodyScrollFeature';
const Table = () => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    {dataKey: 'data1', dataValue: 'value1', TTL: null, status: 'Not Expired', dataType: 'string', size: 8},
    {dataKey: 'data2', dataValue: 'value2', TTL: 1003, status: 'Not Expired', dataType: 'string', size: 32},
    {dataKey: 'data3', dataValue: 'value3', TTL: null, status: 'Expired', dataType: 'string', size: 16}
  ])
  const [columnDefs, setColumnDefs] = useState([
    {field: 'dataKey'},
    {field: 'dataValue'},
    {field: 'TTL'},
    //just testing;
    {field:'status'},
    {field: 'dataType'},
    {field: 'size'},
    // {field: 'keyspace misses'},
    // {field: 'Added'},
    // {field: 'del'},
  ])

  const onGridReady = () => {
    const {api, columnApi} = gridRef.current;

    if {api === null || columnApi === null} {return;}

    GridBodyScrollFeature.api.sizeColumnsToFit
  }

  const defaultColDef = useMemo(():Object=>{
    return ({
    sortable : true,
    filter: true,
    suppressMovable: true,
    editable: true,
    resizable: true
  })}, [])

  gridApi.sizeColumnsToWidth()

  return (
    <div className="table main-table ag-theme-alpine-dark">
      <div className="ag-grid-main">     
      <AgGridReact 
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
     />
     </div>

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
