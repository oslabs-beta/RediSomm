// import RealtimeLine from '../graphs/RealtimeLine';
import React from 'react';
import StackedArea from '../graphs/StackedArea';
import StackedLine from '../graphs/StackedLine';
import StackedBar from '../graphs/ApexStackedBar';
import ApexPie from '../graphs/ApexPieChart';
import ApexBar from '../graphs/ApexBarGraph';

const Metrics = () => {
  return (
    <div className="metrics-page">
      <h1 className="metrics" style={{ color: 'white' }}>
        Metrics
      </h1>
      <div className="stackedarea">
        <StackedArea />
      </div>
      {/* <TestGraph /> */}
      {/* <ApexBar />
      <StackedBar />
      <StackedLine />
      <ApexPie /> */}
    </div>
  );
};

export default Metrics;
