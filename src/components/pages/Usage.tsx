import React from 'react';
import RealtimeChart from '../graphs/Realtimechart';

const Usage = () => {
  return (
    <div className="usage-page">
      <h1 className="usage" style={{ color: 'white' }}>
        Usage
      </h1>
      <h4 className="usageovertime">Usage Over Time</h4>
      <div className="realtime-chart">
        <RealtimeChart />
      </div>
    </div>
  );
};

export default Usage;
