import React from 'react';
import DatabaseView from './DatabaseView';
import Nav from './Nav';

const Routes = () => {
  return (
    <div className="window-display">
      <Nav />
      <div className="routes">
        <DatabaseView />
      </div>
    </div>
  );
};

export default Routes;
