import './Row.css'

import {Cell, Empty} from './Cell'

function Row({data, firstRow, lastRow}) {
    const topBorder = firstRow ? <div className='top-border'></div> : <></>
    return <div className="row">
        {topBorder}
        {data.map((c, idx) => {
            if (c !== undefined && !c.empty_overlay) {
                return <Cell key={idx} col={idx} data={c} selected={c.selected} lastRow={lastRow}/>
            } else {
                const overlay = c !== undefined && c.empty_overlay
                return <Empty key={idx} border={lastRow} overlay={overlay}/>
            }
        })}
    </div>
}

function Total({data}) {
    return <div className="row">
        {data.map((c, idx) => {
            return <span key={idx}>
                <div className='top-border' key={'brd'+idx}></div>
                <div className='cell' key={'total'+idx}>{data[idx]}</div>
            </span>
        })}
    </div>
}

export {Row, Total}
