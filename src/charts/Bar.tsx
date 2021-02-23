import {
    createRef,
    FC, 
    useEffect, 
    useState
} from 'react';
import * as d3 from 'd3';
import { TBarProps, TTransactionVolumeElement } from '../types';

const Bar: FC<TBarProps> = (props) => {
    const [ref, setRef] = useState(createRef<SVGGElement>());

    useEffect(() => {
        d3.select(ref.current).selectAll("rect")
            .data(props.data)
            .enter()
            .append("rect")
            .attr("class", "sBar")
            .attr("x", (d, i) => props.xScale(d.hour))
            .attr("y", (d, i) => props.yScale(d.value))
            .attr("width", props.xScale.bandwidth())
            .attr("height", (d) => props.dims.height - props.dims.margin.top - props.dims.margin.bottom - props.yScale(d.value))
            .style('transform', `translate(${
                0
            }, ${
                props.dims.height
            })`);
        d3.select(ref.current).selectAll('rect')
            .on('mouseenter', onMouseEnter)
        return () => {
            d3.select(ref.current).selectAll('rect').remove();
        }
    })

    const onMouseEnter = (d: MouseEvent, i: any) => {
        props.setIsToolTipVisible(d.offsetX, i as TTransactionVolumeElement);
    }

    const onMouseLeave = () => {
        props.setTooltipInvisibile();
    }

    return(
        <g 
            ref={ref}
            width={props.dims.width - props.dims.margin.left - props.dims.margin.right}
            height={props.dims.height - props.dims.margin.top - props.dims.margin.bottom}
            onMouseLeave={onMouseLeave}
            transform={`translate(${
                props.dims.margin.left 
            }, ${
                props.dims.margin.bottom
            })`} />            
    )
}

export default Bar;