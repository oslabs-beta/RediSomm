import React, { useRef, useState, useEffect } from 'react'
import { select, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'

let initialData = [
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
const Update: React.FC = () => {
    const dimensions = { width: 800, height: 500 }
    const svgRef = useRef<SVGSVGElement | null>(null)
    const [data, setData] = useState(initialData)
    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')

    let x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, dimensions.width])
        .padding(0.05)

    let y = scaleLinear()
        .domain([0, max(data, d => d.units)!])
        .range([dimensions.height, 0])

    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    useEffect(() => {
        if (!selection) {
            setSelection(select(svgRef.current))
        } else {
            selection
                .selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => x(d.name)!)
                .attr('y', d => y(d.units))
                .attr('width', x.bandwidth)
                .attr('height', d => dimensions.height - y(d.units))
                .attr('fill', 'orange')
        }
    }, [selection])

    /**
     * another useEffect with data as its dependency
     * runs everytime data changes so updates can be made to the chart
     */
    useEffect(() => {
        if (selection) {
            /**
             * update the scales
             */
            x = scaleBand()
                .domain(data.map(d => d.name))
                .range([0, dimensions.width])
                .padding(0.05)
            y = scaleLinear()
                .domain([0, max(data, d => d.units)!])
                .range([dimensions.height, 0])

            /**
             * join the data
             */
            const rects = selection.selectAll('rect').data(data)
            /**
             * remove exit selection
             */
            rects.exit().remove()
            /**
             * update the current shapes in the DOM
             */
            rects
                .attr('x', d => x(d.name)!)
                .attr('y', d => y(d.units))
                .attr('width', x.bandwidth)
                .attr('height', d => dimensions.height - y(d.units))
                .attr('fill', 'orange')
            /**
             * append the enter selection shapes to the DOM
             */
            rects
                .enter()
                .append('rect')
                .attr('x', d => x(d.name)!)
                .attr('y', d => y(d.units))
                .attr('width', x.bandwidth)
                .attr('height', d => dimensions.height - y(d.units))
                .attr('fill', 'orange')
        }
    }, [data])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        setData([...data, { name, units: parseInt(unit) }])
    }
    return (
        <>
            <svg
                ref={svgRef}
                width={dimensions.width}
                height={dimensions.height}
            />
            <form onSubmit={submit}>
                Name:
                <input value={name} onChange={e => setName(e.target.value)} />
                Units:
                <input value={unit} onChange={e => setUnit(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Update
