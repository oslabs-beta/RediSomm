import React, { useRef, useState, useEffect } from 'react'
import { select, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'

const data = [
    {
        name: 'foo',
        units: 32,
    },
    {
        name: 'bar',
        units: 67,
    },
    {
        name: 'baz',
        units: 81,
    },
    {
        name: 'hoge',
        units: 38,
    },
    {
        name: 'piyo',
        units: 28,
    },
    {
        name: 'hogera',
        units: 59,
    },
]
const Group: React.FC = () => {
    /**
     * dimensions is mostly used for margins
     * a central place where you can refer to if
     *  you need to translate and determing the width of groups
     * useful for charts that need axes
     */
    const dimensions = {
        width: 600,
        height: 600,
        marginLeft: 100,
        marginBotton: 100,
        chartHeight: 500,
        chartWidth: 500,
    }
    const divRef = useRef<null | HTMLDivElement>(null)
    const y = scaleLinear()
        .domain([0, max(data, d => d.units)!])
        .range([0, dimensions.chartHeight])

    /**
     * inner and outer paddings can be set
     */
    const x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, dimensions.chartWidth])
        .paddingInner(0.05)
        .paddingOuter(0.3)

    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement,
        unknown,
        null,
        undefined
    >>(null)

    const [chartSelection, setChartSelection] = useState<null | Selection<
        SVGGElement,
        unknown,
        null,
        undefined
    >>(null)

    useEffect(() => {
        if (!selection) {
            setSelection(select(divRef.current).append('svg'))
        } else if (selection && !chartSelection) {
            selection
                .attr('width', dimensions.width)
                .attr('height', dimensions.height)
                .append('rect')
                .attr('width', dimensions.width)
                .attr('height', dimensions.height)
                .attr('fill', 'orange')
            /**
             * here we demonstrate transformation and translation
             * this is useful for groups where we want to translate
             * multiple svg elements
             */
            selection
                .append('rect')
                .attr('width', dimensions.chartWidth)
                .attr('height', dimensions.chartHeight)
                .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
                .attr('fill', 'black')

            /**
             * here we add a group element that will be later used for
             * our rectangle bars as we will need to translate all of them
             * we offload the bulding of the chart
             * utilize more helper methods as d3 code may get complex
             */
            const chart = selection
                .append('g')
                .attr('width', dimensions.chartWidth)
                .attr('height', dimensions.chartHeight)
                .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
            setChartSelection(chart)
        } else {
            buildChart()
        }
    }, [selection, chartSelection])

    /**
     * helper method in building the the rectangle charts
     * since the group is already translated, all we need to do
     * is add the rects in
     */
    const buildChart = () => {
        if (chartSelection) {
            chartSelection
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('height', d => y(d.units))
                .attr('width', x.bandwidth)
                .attr('x', d => x(d.name)!)
                .attr('fill', 'red')
        }
    }

    return <div ref={divRef} />
}

export default Group
