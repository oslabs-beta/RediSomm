import React from 'react';
import PieGraph from '../graphs/PieGraph';
import TestGraph from '../graphs/TestGraph';

const Settings = () => {
  return (
    <div className="settings-page">
      <h1 style={{ color: 'white' }}>Settings!!!</h1>
      <PieGraph />
      <TestGraph />
    </div>
  );
};

export default Settings;
