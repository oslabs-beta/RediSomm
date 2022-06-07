import React, { useEffect, useRef } from 'react'
import { select, selectAll } from 'd3-selection'

const Selection: React.FC = () => {
    const svgRef = useRef<null | SVGSVGElement>(null)

    useEffect(() => {
        /*
            svgRef is a ref object
            svgRef.current is a reference to the DOM node
            select() provides a wrapper around the selected
                element for modifications
        */
        console.log(svgRef.current)
        console.log(select(svgRef.current))

        /*
            select() can target W3C selector strings 
                eg select(#id-name) or  select(.class-name)
        */
        console.log(select('.foo'), select('#bar'))

        /*
            select() provides methods and properties
                to help with modifying the selected element
            <svg width={100} height={100} fill="blue" />
        */
        select(svgRef.current)
            .append('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', 'blue')

        /*
            selectAll() still returns a selection object 
            but refers to multiple elements
        */
        selectAll('.selectAll')
            .append('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', (_, i) => {
                if (i) {
                    return 'orange'
                } else {
                    return 'red'
                }
            })

        /*
            Groups are a way to group elements together
            useful for translating all elements 
        */
        const groupedElement = select('.group').append('g')

        groupedElement
            .append('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', 'purple')
        groupedElement
            .append('circle')
            .attr('cx', 250)
            .attr('cy', 50)
            .attr('r', 40)
            .attr('fill', 'teal')

        groupedElement.attr('transform', 'translate(0,50)')
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/*default svg size is 300x150 */}
            <svg ref={svgRef} />
            <svg className="foo" />
            <svg id="bar" />
            <svg className="selectAll" />
            <svg className="selectAll" />
            <svg className="group" width={500} />
        </div>
    )
}

export default Selection
