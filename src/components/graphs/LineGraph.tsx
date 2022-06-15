import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

function LineGraph() {
  //dummie data
  const [data] = useState([10, 5, 25, 25, 30, 5]);
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg
    const w = 400;
    // const h = 100;
    const h = 40;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#462639')
      .style('margin-top', '50')
      .style('overflow', 'visible');
    //bottom coding changed y axis data to blue;
    //   .style('stroke', 'blue');

    //setting the scaling (refers to range of value)
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale: any = d3.scaleLinear().domain([0, h]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    //setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((i: any) => i + 1);
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((i: any) => i + 5);
    // const yAxis = d3.axisLeft(yScale).ticks(5);
    svg
      .append('g')
      .call(xAxis)
      //this code is for x axis defaulty disply on top and to have it on the bottom
      //    .attr('transform', 'translate(0, ${h})');
      .attr('transform', `translate(0, ${h})`);
    svg.append('g').call(yAxis);

    //setting up the data for the svg
    // can change color from 'stroke' under this code
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      //there was error and had to put any temporarily for d
      .attr('d', (d: any) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'white');
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default LineGraph;
