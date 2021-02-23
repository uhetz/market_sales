import {
    FC,
    useState,
    useEffect,
    createRef
} from 'react';
import * as d3 from 'd3';
import { AxisProps } from '../types';
import '../App.css';

const YAxis: FC<AxisProps> = (props: AxisProps) => {
    const [ref, setRef] = useState(createRef<SVGGElement>());

    useEffect(() => {     
        const g = d3.select(ref.current);
        const axisGenerator = d3.axisLeft(props.scale);
        axisGenerator(g as d3.Selection<SVGGElement, any, any, any>);
    })

    return (
        <g ref={ref} className='y-axis' transform={`translate(${
            props.dims.margin.left
        }, ${
            props.dims.margin.top
        })`}>
            
        </g>
    )
};

export default YAxis;