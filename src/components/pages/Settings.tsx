// import RealtimeLine from '../graphs/RealtimeLine';
import React from 'react';
import TestGraph from '../graphs/TestGraph';
import StackedArea from '../graphs/StackedArea';
import StackedLine from '../graphs/StackedLine';
import StackedBar from '../graphs/ApexStackedBar';
import ApexPie from '../graphs/ApexPieChart';
import ApexBar from '../graphs/ApexBarGraph';

const Settings = () => {
  return (
    <div className="settings-page">
      <h1 style={{ color: 'white' }}>Settings!!!</h1>
      <TestGraph />
      <ApexBar />
      <StackedBar />
      <StackedLine />
      <StackedArea />
      <ApexPie />
    </div>
  );
};

export default Settings;
