import React from 'react';
import PieGraph from '../graphs/PieGraph';
import TestGraph from '../graphs/TestGraph';
import RealtimeLine from '../graphs/RealtimeLine';
import StackedArea from '../graphs/StackedArea';
import StackedLine from '../graphs/StackedLine';

const Settings = () => {
  return (
    <div className="settings-page">
      <h1 style={{ color: 'white' }}>Settings!!!</h1>
      <PieGraph />
      <TestGraph />
      {/* <RealtimeLine /> */}
      <StackedLine />
      <StackedArea />
    </div>
  );
};

export default Settings;
