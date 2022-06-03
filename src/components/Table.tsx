import React, {useEffect, useState, useMemo, useRef} from 'react';
// import DataRow from './DataRow';
import {AgGridReact} from 'ag-grid-react';
import {AgGridReact as AgGridReactType} from 'ag-grid-react/lib/agGridReact'
import axios from 'axios';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { GridApi } from 'ag-grid-community';
import { application } from 'express';
import { GridBodyScrollFeature } from 'ag-grid-community/dist/lib/gridBodyComp/gridBodyScrollFeature';

export type RowDataType = {
  key: string,
  value: string,
  expirationTime: string,
  dataType: string,
  expired: string, //this is changed from boolean to string for display purposes
  keyspaceMiss: number,
  keyspaceHit: number,
  timeAdded: Date,
  oldKeyNames: string[],
  oldValues: string[],
  manualDelete: boolean
}

const Table = () => {
  const gridRef = useRef<AgGridReactType>(null);

  const [rowData, setRowData] = useState<Object[]>([
    {key: 'data1', value: 'value1', TTL: 'no', type: 'array', status: 'false', size: '5'},
    {key: 'data2', value: 'value2', TTL: 'no', type: 'array', status: 'false', size: '16'},
    {key: 'data3', value: 'value3', TTL: '42069', type: 'string', status: 'false', size: '12'},
    {key: 'Young', value: 'det. pikachu', TTL: 'no', type: 'string', status: 'false', size: '1'},
    {key: 'Andrew', value: 'psyduck', TTL: '200', type: 'string', status: 'false', size: '6'},
    {key: 'Andrea', value: 'charizard', TTL: 'no', type: 'string', status: 'false', size: '2'},
    {key: 'Sam', value: 'Mr. Mime', TTL: 'n/a', type: 'string', status: 'expired', size: '31'},
    {key: 'Eric', value: 'snorlax', TTL: 'n/a', type: 'string', status: 'expired', size: '24'},
  ])
  const [columnDefs, setColumnDefs] = useState<Object[]>([
    {field: 'key', resizeable: true},
    {field: 'value'},
    {field: 'TTL'},
    //just testing;
    {field:'status'},
    {field: 'type'},
    {field: 'size'},
    // {field: 'keyspace misses'},
    // {field: 'Added'},
    // {field: 'del'},
  ])
  // ANY placeholder until i find the actual exported type of on grid ready...
  const onGridReady = (params: any) => {
    const {api, columnApi} = gridRef.current
    if (api === null || columnApi === null) {return;}

    params.api.sizeColumnsToFit()

  }

  const gridOptions: Object = {
  
    rowSelection: 'multiple',
    animateRows: true
  }
  const defaultColDef = useMemo(()=> ({
    sortable : true,
    filter: true,
    suppressMovable: true,
    editable: true,
    resizable: true,
  }),[])
  
  useEffect(() =>  {
    // typescript does not support useEffect returning Promises
    
    axios('http://localhost:8080/api/getAll')
    .then(response => console.log(response))
    .then(initData => initData)
    .catch(err => console.log(err))
    
    // console.log(initData)
    // setRowData((prevState : RowDataType[]) : RowDataType[] =>{
    //     return [...prevState, ...initData]
    //   })
    }, [])
    
    return (
      <div className="table main-table ag-theme-alpine-dark">
      <div className="ag-grid-main">     
      <AgGridReact 
      animateRows={true}
      gridOptions={gridOptions}
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
