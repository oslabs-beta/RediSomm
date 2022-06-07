// import React from 'react';

// const Metrics = () => {
//   return (
//     <div className="metrics-page">
//       <h1 style={{ color: 'white' }}>Metrics!!!</h1>
//     </div>
//   );
// };

// export default Metrics;

// import React, { useEffect, useRef } from 'react';
// import { select, selectAll } from 'd3-selection';

// const Metrics: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);
//   useEffect(() => {
//     // console.log(select(svgRef.current));
//     select(svgRef.current)
//       .append('rect')
//       .attr('width', 100)
//       .attr('height', 100)
//       .attr('fill', 'blue');
//   });
//   return (
//     <div className="metrics-page">
//       <h1 style={{ color: 'white' }}>Metrics!!!</h1>
//       <svg ref={svgRef} />
//     </div>
//   );
// };

// export default Metrics;

import React from 'react';
import { storiesOf } from '@storybook/react';
import BarGraph from '../graphs/BarGraph';
import LineGraph from '../graphs/LineGraph';
import PieGraph from '../graphs/PieGraph';
import HitRate from '../graphs/HitRate';
import BarGrapht from '../graphs/BarGrapht';

import Ticker from '../Ticker';
import Table from '../Table';
import TableAdd from '../TableAdd';

// storiesOf('D3, React tutorial', module)
//   .add('1 - selections', () => <Selection />)
//   .add('2 - data joins', () => <DataJoin />)
//   .add('2.5 - enter selection', () => <Enter />)
//   .add('3 - scales', () => <Scales />)
//   .add('4 - groups and margins', () => <Group />)
//   .add('5 - axis', () => <Axis />)
//   .add('6 - update', () => <Update />)
//   .add('6.5 - transition', () => <Transition />);

const Metrics: React.FC = () => {
  return (
    <div className="metrics-page">
      <h1 style={{ color: 'white' }}>Metrics!!!</h1>
      <BarGraph />
      <BarGrapht />
      <LineGraph />
      <PieGraph />
      <HitRate />
    </div>
  );
};

export default Metrics;
