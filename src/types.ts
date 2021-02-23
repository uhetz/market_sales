import { NumberValue } from "d3"

export type TCSV = {
    'Invoice ID': number,
    Branch: string,
    City: string,
    'Customer type': string,
    Gender: string,
    'Product line': string,
    'Unit price': number,
    Quantity: number,
    'Tax 5%': number,
    Total: number,
    Date: Date,
    Time: string,
    Payment: string,
    cogs: number,
    'gross margin percentage': number,
    'gross income': number,
    Rating: number
}

export type THubState = {
    data: any,
}

export type TTransactionVolumeElement = {
    hour: string,
    // payment: string,
    // gender: string,
    productLine: [string, number][],
    value: number
}
export type TTransactionVolume = {
    data: TTransactionVolumeElement[],
    dims: TDimensions,
    isToolTipVisible: boolean,
    xTooltip: number,
    yTooltip: number,
    eTooltip: TTransactionVolumeElement | null
}
export type TTransactionVolumeProps = {
    data: d3.DSVParsedArray<TCSV>,
} 

export type TDimensions = {
    width: number,
    height: number,
    margin: {
        top: number,
        right: number,
        bottom: number,
        left: number
    }
}

export type AxisProps = {
    dims: TDimensions,
    scale: any
}

export type TBarProps = {
    dims: TDimensions,
    xScale: any,
    yScale: any,
    data: TTransactionVolumeElement[],
    setIsToolTipVisible: (cx: number, i: TTransactionVolumeElement) => void,
    setTooltipInvisibile: () => void
}

export type TTooltip = {
    x: number,
    y: number,
    element: TTransactionVolumeElement
}