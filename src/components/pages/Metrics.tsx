// import RealtimeLine from '../graphs/RealtimeLine';
import React from 'react';
import StackedArea from '../graphs/StackedArea';
import StackedBar from '../graphs/ApexStackedBar';

const Metrics = () => {
  return (
    <div className="metrics-page">
      <h1 className="metrics" style={{ color: 'white' }}>
        Metrics
      </h1>
      <div className="stackedarea">
        <StackedArea />
      </div>
    </div>
  );
};

export default Metrics;
