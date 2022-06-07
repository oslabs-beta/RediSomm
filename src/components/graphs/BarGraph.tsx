import React, { useRef, useState, useEffect } from 'react';
import { select, Selection } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';

const data = [
  {
    name: 'Andrea',
    units: 32
  },
  {
    name: 'Andrew',
    units: 67
  },
  {
    name: 'Sam',
    units: 81
  },
  {
    name: 'Young',
    units: 38
  },
  {
    name: 'KBBQ',
    units: 28
  },
  {
    name: 'IU',
    units: 59
  }
];

const BarGraph: React.FC = () => {
  const dimensions = {
    width: 600,
    height: 600,
    marginLeft: 100,
    marginBottom: 100,
    chartHeight: 500,
    chartWidth: 500
  };
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const y = scaleLinear()
    .domain([0, max(data, (d) => d.units)!])
    .range([dimensions.width - dimensions.marginBottom, 0]);

  const x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dimensions.width - dimensions.marginLeft])
    .padding(0.1);

  /**
   * generates axis functions for the given scales
   * when called, axis are rendered at the origin
   * appy transforms to place the axis where they need to be
   * modifications can be aplied to the functions to style the axis
   */
  const xAxis = axisBottom(x);
  const yAxis = axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `${d} units`);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      /**
       * we need to call so we can pass in the current selection
       * calling an axis will return the current seleciton
       * i have separated the groups and put them into variables
       * for readability
       */
      const xAxisGroup = selection
        .append('g')
        .attr(
          'transform',
          `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`
        )
        .call(xAxis);
      /**
       * you can grab the selection of texts
       * in the xAxisGroup to style them
       */
      xAxisGroup
        .selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
        .attr('font-size', '15px');

      const yAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .call(yAxis);

      const charts = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', (d) => dimensions.chartHeight - y(d.units))
        .attr('x', (d) => x(d.name)!)
        //translate the bars
        .attr('y', (d) => y(d.units))
        //color of bar
        .attr('fill', '#462639')
        //color of borderline
        .style('stroke', 'white');
    }
  }, [selection]);
  return (
    <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
  );
};

export default BarGraph;
