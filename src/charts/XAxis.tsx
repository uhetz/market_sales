import {
    createRef,
    FC,
    useState,
    useEffect
} from 'react';
import * as d3 from 'd3';
import { AxisProps } from '../types';
import '../App.css';

const XAxis: FC<AxisProps> = (props: AxisProps) => {
    const [ref, setRef] = useState(createRef<SVGGElement>());

    useEffect(() => {
        const g = d3.select(ref.current);
        const axisGenerator = d3.axisBottom(props.scale);
        axisGenerator(g as d3.Selection<SVGGElement, any, any, any>);
        d3.select('.axis .tick:first-child').remove();
    })

    return (
        <g ref={ref} className='x-axis' transform={`translate(${
            props.dims.margin.left
        }, ${
            props.dims.height - props.dims.margin.bottom
        })`}>
            
        </g>
    )
};

export default XAxis;