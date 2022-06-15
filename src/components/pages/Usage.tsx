import React from 'react';
import TestGraph from '../graphs/TestGraph';
// import ApexPie from '../graphs/ApexPieChart';
// import Realtimetest from '../graphs/Realtimetest';

const Usage = () => {
  return (
    <div className="usage-page">
      <h1 className="usage" style={{ color: 'white' }}>
        Usage
      </h1>
      <h4 className="usageovertime">Usage Over Time</h4>
      <div className="realtime-chart">
        <TestGraph />
      </div>
      {/* <ApexPie /> */}
      {/* <Realtimetest /> */}
    </div>
  );
};

export default Usage;
