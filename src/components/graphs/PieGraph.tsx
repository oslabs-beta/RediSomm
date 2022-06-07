// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const Pie = () => {
//   const [data]: any = useState([
//     { item: 'A', count: 590 },
//     { item: 'B', count: 291 },
//     { item: 'C', count: 348 },
//     { item: 'D', count: 145 },
//     { item: 'E', count: 46 }
//   ]);
//   const pieChart = useRef();

//   useEffect(() => {
//     // Get positions for each data object
//     const piedata = d3.pie().value((d: any) => d.count)(data);
//     // Define arcs for graphing
//     const arc: any = d3.arc().innerRadius(0).outerRadius(200);

//     const colors = d3.scaleOrdinal([
//       '#ffa822',
//       '#134e6f',
//       '#ff6150',
//       '#1ac0c6',
//       '#dee0e6'
//     ]);

//     // Define the size and position of svg
//     const svg = d3
//       .select(pieChart.current)
//       .attr('width', 600)
//       .attr('height', 600)
//       // .style('background-color','yellow')
//       .append('g')
//       .attr('transform', 'translate(300,300)');

//     // Add tooltip
//     const tooldiv = d3
//       .select('#chartArea')
//       .append('div')
//       .style('visibility', 'hidden')
//       .style('position', 'absolute')
//       .style('background-color', 'red');

//     // Draw pie
//     svg
//       .append('g')
//       .selectAll('path')
//       .data(piedata)
//       .join('path')
//       .attr('d', arc)
//       .attr('fill', (d: any, i: any) => colors(i))
//       .attr('stroke', 'white')
//       .on('mouseover', (e, d: any) => {
//         console.log(e);
//         console.log(d);

//         tooldiv
//           .style('visibility', 'visible')
//           .text(`${d.data.item}:` + `${d.data.count}`);
//       })
//       .on('mousemove', (e, d) => {
//         tooldiv
//           .style('top', e.pageY - 50 + 'px')
//           .style('left', e.pageX - 50 + 'px');
//       })
//       .on('mouseout', () => {
//         tooldiv.style('visibility', 'hidden');
//       });
//   });

//   return (
//     <div id="chartArea">
//       <svg ref={pieChart}></svg>
//     </div>
//   );
// };

// export default Pie;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Pie = () => {
  const [data]: any = useState([
    { property: 'Andrew', value: 1 },
    { property: 'Andrea', value: 2 },
    { property: 'Sam', value: 3 },
    { property: 'Young', value: 7 },
    { property: 'IU', value: 8 }
  ]);
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg container
    // const w: number = 500;
    // const h: number = 500;
    // const radius: number = w / 2;

    // const svg = d3
    //   .select(svgRef.current)
    //   .attr('width', w)
    //   .attr('height', h)
    //   .style('overflow', 'visible')
    //   .style('maring-top', '400px');

    const svg = d3
      .select(svgRef.current)
      .attr('width', 600)
      .attr('height', 600)
      // .style('background-color','yellow')
      .append('g')
      .attr('transform', 'translate(300,300)');

    //setting up chart
    const formattedData = d3.pie().value((d: any) => d.value)(data);
    const arcGenerator: any = d3.arc().innerRadius(0).outerRadius(200);
    // const color: any = d3.scaleOrdinal().range(d3.schemeSet2);
    const color: any = d3.scaleOrdinal([
      '#ffa822',
      '#134e6f',
      '#ff6150',
      '#1ac0c6',
      '#dee0e6'
    ]);

    //setting up svg data
    svg
      .selectAll()
      .data(formattedData)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', (d: any) => color(d.value))
      // .style('opacity', 0.7)
      .attr('stroke', 'white');

    //setting up annotation
    svg
      .selectAll()
      .data(formattedData)
      .join('text')
      .text((d: any) => d.data.property + ':' + d.data.value)
      .attr('transform', (d: any) => `translate(${arcGenerator.centroid(d)})`)
      .style('text-anchor', 'middle');
  }, [data]);
  return (
    <div id="chartArea">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Pie;
