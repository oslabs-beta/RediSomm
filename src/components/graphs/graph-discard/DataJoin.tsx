import React, { useRef, useEffect, useState } from 'react'
import { select, Selection } from 'd3-selection'

const dataForRects = [
    { name: 'Foo', units: 200 },
    { name: 'Bar', units: 150 },
    { name: 'Baz', units: 300 },
]

const dataForRect = [{ width: 200, height: 400, color: 'red' }]

const DataJoin: React.FC = () => {
    const svgOneRef = useRef<null | SVGSVGElement>(null)
    const svgTwoRef = useRef<null | SVGSVGElement>(null)
    /*
        useState is used to store the selected svg nodes
        The Selection Type can be found by hovering over the selected statement
    */
    const [selectionOne, setSelectionOne] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    const [selectionTwo, setSelectionTwo] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    /*
        useEffect to monitor changes in the selections
        if the selections have not been set, set the selections
        else, join the data and set attributes using the data
    */
    useEffect(() => {
        if (!selectionOne) {
            setSelectionOne(select(svgOneRef.current))
        } else {
            //append returns new d3 selection based on the appended element
            const oneRect = selectionOne.append('rect')
            console.log(oneRect)

            // joining data to a single element
            oneRect
                .data(dataForRect)
                .attr('width', d => d.height)
                .attr('height', d => d.width)
                .attr('fill', d => d.color)
        }
        if (!selectionTwo) {
            setSelectionTwo(select(svgTwoRef.current))
        } else {
            //joining data to multiple elements
            const allRects = selectionTwo.selectAll('rect')
            console.log(allRects)

            //joins data to multiple elements
            allRects
                .data(dataForRects)
                .attr('width', 100)
                .attr('height', d => d.units)
                .attr('x', (_, i) => i * 100)
        }
    }, [selectionOne, selectionTwo])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <svg ref={svgOneRef} />
            <svg ref={svgTwoRef} height={300} width={300}>
                <rect />
                <rect />
                <rect />
            </svg>
        </div>
    )
}

export default DataJoin
