import { 
    Component, 
    createRef,
    createContext
} from 'react';
import * as d3 from 'd3';

import { TCSV, TTransactionVolume, TTransactionVolumeElement, TTransactionVolumeProps } from '../types';
import XAxis from './XAxis';
import YAxis from './YAxis';
import Bar from './Bar';
import Tooltip from './Tooltip';

import '../App.css';

class TransactionVolumeAtTheDay extends Component<TTransactionVolumeProps, TTransactionVolume> {
    svg = createRef<SVGSVGElement>();
    tooltipContext = createContext(this.state);

    state: TTransactionVolume = {
        data: [],
        dims: {
            width: 0,
            height: 0,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        isToolTipVisible: false,
        xTooltip: 0,
        yTooltip: 0,
        eTooltip: null
    }

    xScale = d3.scaleBand().padding(0.4);
    yScale = d3.scaleLinear();

    setIsToolTipVisible = (cx: number, i: TTransactionVolumeElement) => {
        if (!this.state.isToolTipVisible) {
            const domain = this.xScale.domain()[Math.round(cx / this.xScale.step()) - 1]
            console.log(domain)
            this.setState({ 
                isToolTipVisible: true,
                xTooltip: (this.xScale(domain)) as number + this.state.dims.margin.left + this.state.dims.margin.right - 5,
                yTooltip: this.state.dims.height - this.yScale(i.value),
                eTooltip: i
            });
        }
    }
    setTooltipInvisibile = () => {
        if (this.state.isToolTipVisible) this.setState({
            isToolTipVisible: false,
            xTooltip: 0,
            yTooltip: 0,
            eTooltip: null
        });
    }

    componentDidMount() {
        this.setState({ dims: {
            width: this.svg.current?.clientWidth || 300,
            height: this.svg.current?.clientHeight || 150,
            margin: {
                top: 20,
                right: 40,
                bottom: 20,
                left: 40
            }
        }})
    }

    static getDerivedStateFromProps(props: TTransactionVolumeProps, state: TTransactionVolume) {
        let result: TTransactionVolumeElement[] = d3.rollups(
            props.data, 
            v => d3.sum(v, (d: TCSV) => d.Total), 
            (d: TCSV) => d.Time.slice(0, 2),
            (d: TCSV) => d['Product line']
        ).sort((a, b) => d3.ascending(a[0], b[0])).map((item) => {
            const sum = d3.sum(item[1], d => +d[1]);
            const h = +item[0] < 13 ? item[0] + ' AM' : +item[0] - 12 + ' PM'
            return {
                hour: h,
                value: Math.round(sum),
                productLine: item[1]
            }
        });
        return { data: result }
    }

    componentDidUpdate() {

    }

    render() {
        this.xScale
            .domain(this.state.data.map(d => d.hour + ''))
            .range([0, this.state.dims.width - this.state.dims.margin.right - this.state.dims.margin.left]);

        this.yScale
            .domain([0, d3.max(this.state.data, d => d.value) || 1000])
            .range([this.state.dims.height - this.state.dims.margin.top - this.state.dims.margin.bottom, this.state.dims.margin.bottom]);

        const TooltipElem = (this.state.isToolTipVisible && this.state.eTooltip) ? <Tooltip 
            x={this.state.xTooltip} 
            y={this.state.yTooltip} 
            element={this.state.eTooltip}/> : null;

        return (
            <div className='transaction-to-volume-chart-container'>
                <svg
                    ref={this.svg}
                    className='transaction-to-volume-chart'
                >
                    <XAxis 
                        scale={ this.xScale }
                        dims={ this.state.dims }
                    />
                    <YAxis 
                        dims={ this.state.dims }
                        scale={ this.yScale }
                    />
                    <Bar 
                        data={ this.state.data }
                        dims={ this.state.dims }
                        xScale={ this.xScale }
                        yScale={ this.yScale }
                        setIsToolTipVisible={this.setIsToolTipVisible}
                        setTooltipInvisibile={this.setTooltipInvisibile}
                    />
                    
                </svg>
                { TooltipElem }
            </div>
        )
    }
}

export default TransactionVolumeAtTheDay;