import React, {useEffect, useState, useMemo, useRef} from 'react';

import {AgGridReact} from 'ag-grid-react';
import {AgGridReact as AgGridReactType} from 'ag-grid-react/lib/agGridReact'
import axios from 'axios';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { GridApi, ColumnApi } from 'ag-grid-community';
import { application } from 'express';
import { GridBodyScrollFeature } from 'ag-grid-community/dist/lib/gridBodyComp/gridBodyScrollFeature';


export type GridReadyEvent = {
  api: GridApi;
  columnApi: ColumnApi;
  // Event identifier 
  type: string;
}

export type GridSizeChangedEvent = {
  // The grid's DIV's clientWidth 
  clientWidth: number;
  // The grid's DIV's clientHeight 
  clientHeight: number;
  api: GridApi;
  columnApi: ColumnApi;
  // Event identifier 
  type: string;
}

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

  const [initLoad, setInitLoad] = useState<boolean>(false)
  const [rowData, setRowData] = useState<Object[]>([
  ])
  const [columnDefs, setColumnDefs] = useState<Object[]>([
    {field: 'key', headerName: 'key', resizable: true},
    {field: 'value', headerName: 'value'},
    {field: 'ttl', headerName: 'TTL', cellRenderer: ({value: ttl}: any) => {
      return ttl ? ttl : 'n/a';
  }},
    {field:'expired', headerName: 'status', cellRenderer: ({value : isExpired}: any) => {
      return isExpired ? 'Expired' : 'Active';
  }},
    {field: 'dataType', headerName: 'type'},
    {field: 'size', headerName: 'size'},

  ])
  
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
  
  const onGridReady = (params: GridReadyEvent) => {
    const {api, columnApi} = gridRef.current
    if (api === null || columnApi === null) {return;}
    params.api.sizeColumnsToFit()
  }

  const onGridSizeChanged = (params: GridSizeChangedEvent) => {
    const {api, columnApi} = gridRef.current
    if (api === null || columnApi === null) {return;}
    params.api.sizeColumnsToFit()
  }
  // get initial data and display on main table
  useEffect(() =>  {
    // {dataType, expirationTime, expired, key, keyspaceHit, keyspaceMiss, manualDelete, oldKeynames, oldValues, timeAdded, value, ttl, size}
    axios('http://localhost:8080/api/getAll')
    .then(response => response.data)
    .then((data) =>{
      setRowData((prevState : RowDataType[]) : RowDataType[] =>{
        return [...prevState, ...data]
      })
      setInitLoad(true);
    })
    .catch(err => console.log(err))

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
      onGridSizeChanged={onGridSizeChanged}
      onGridReady={onGridReady}
      />
      </div>

    </div>
  );
};

export default Table;

