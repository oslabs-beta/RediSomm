import React, { useRef, useState, useEffect } from 'react'
import { select, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'

const data = [
    {
        name: 'foo',
        units: 1000,
        color: 'red',
    },
    {
        name: 'bar',
        units: 1200,
        color: 'blue',
    },
    {
        name: 'baz',
        units: 1350,
        color: 'orange',
    },
    {
        name: 'hoge',
        units: 900,
        color: 'purple',
    },
]

const Scales: React.FC = () => {
    const svgRef = useRef<null | SVGSVGElement>(null)
    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    /**
     * provides min and max
     * accepts an iterable as first argument
     * accepts a function to evaluate iterable object
     * d3-min/max differs from Math.min and Math.max
     * as it ignored undefined, null, and NaN values
     * this is useful if you want to ignore missing data
     */
    const maxUnits = max(data, data => data.units)
    //const minUnits = min(data, data => data.units)
    /**
     * Can also use Math.min or Math.max
     * Math.min(...data.map(d => d.units))
     */

    /**
     * Scales are need to scale the data that is joined
     * eg. If i have a dataset that ranges from [100, 5000]
     * obviously we would need to scale that down to pixels
     */
    const y = scaleLinear()
        .domain([0, maxUnits ? maxUnits : 0])
        .range([0, 400])

    /**
     * Band Scales divides the range into uniform bands
     * accepts a domain of categories that can be reffered to
     * commonly used for x-axis of a bar chart
     */
    const x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, 400])
        .padding(0.05)

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current))
        } else {
            console.log(y(1350))
            console.log(y(257))
            console.log(x('bar'))
            selection
                .selectAll('rects')
                .data(data)
                .enter()
                .append('rect')
                .attr('width', x.bandwidth)
                //x(d.name) : undefined | number
                .attr('x', d => {
                    const xCoordinate = x(d.name)
                    if (xCoordinate) {
                        return xCoordinate
                    }
                    return null
                })
                .attr('height', d => y(d.units))
        }
    }, [selection, y])
    return <svg ref={svgRef} height={400} width={500} />
}

export default Scales
