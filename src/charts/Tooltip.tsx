import {
    FC
} from 'react';
import { TTooltip } from '../types';

const Tooltip: FC<TTooltip> = (props) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: props.x,
                bottom: props.y
            }}
        >
            <div className='tooltip'>
                <div className='tooltip-total'>Total: ${props.element?.value}</div>
                <table>
                    <tbody>
                        <tr>
                            <th style={{textAlign: 'left'}}>Product</th>
                            <th>%</th>
                        </tr>
                        {
                            props.element?.productLine.map(item => (
                                <tr>
                                    <td>
                                        <span className='product'>
                                            { item[0] }:
                                        </span> 
                                    </td>
                                    <td className='percentage'>
                                        <span>
                                            { Math.round(item[1] / props.element.value * 100) }
                                        </span>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tooltip;