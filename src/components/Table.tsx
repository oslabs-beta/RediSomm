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
  expired: boolean,
  keyspaceMiss: number,
  keyspaceHit: number,
  timeAdded: Date,
  oldKeyNames: string[],
  oldValues: string[],
  manualDelete: boolean
}

const Table = () => {
  const gridRef = useRef<AgGridReactType>(null);

  const [rowData, setRowData] = useState<Object[]>([])
  const [columnDefs, setColumnDefs] = useState<Object[]>([
    {field: 'Key'},
    {field: 'Value'},
    {field: 'TTL'},
    //just testing;
    {field:'Status'},
    {field: 'Type'},
    {field: 'Size'},
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
    sortable : true,
    filter: true,
    suppressMovable: true,
    editable: true,
    resizable: true
  }

  useEffect(() =>  {
    // typescript does not support useEffect returning Promises

      console.log('in use effect')
      axios('/api/getAll', {headers: {'Content-Type':'application/json'}})
      .then(response => console.log(response))
      .then(initData => initData)
      .catch(err => console.log(err))

      // console.log(initData)
      // setRowData((prevState : RowDataType[]) : RowDataType[] =>{
      //   return [...prevState, ...initData]
      // })
  }, [])

  return (
    <div className="table main-table ag-theme-alpine-dark">
      <div className="ag-grid-main">     
      <AgGridReact 
      ref={gridRef}
      rowData={rowData}
      columnDefs={columnDefs}
      gridOptions={gridOptions}
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
