import React from 'react'

import './Row.css'

import {Cell, Empty} from './Cell'

function Row({data, firstRow, lastRow, infoOpened}) {
    const topBorder = firstRow ? <div className='top-border'></div> : <></>
    return <div className='row'>
        {topBorder}
        {data.map((c, idx) => {
            if (c !== undefined && !c.empty_overlay) {
                return <Cell key={idx} col={idx} data={c} selected={c.selected} lastRow={lastRow} infoOpened={infoOpened}/>
            } else {
                const overlay = c !== undefined && c.empty_overlay
                return <Empty key={idx} col={idx} border={lastRow} overlay={overlay}/>
            }
        })}
    </div>
}

function Total({data}) {
    return <div className='row total'>
        {data.map((c, idx) => {
            const topBorder = (idx === 0) ? <div className='top-border' key={'brd' + idx}></div> : <></>
            const classFirst = (idx === 0) ? 'first' : ''
            return <React.Fragment key={idx}>
                {topBorder}
                <div className={`cell ${classFirst}`} key={'total' + idx}>
                    <b>{data[idx].total}</b> {data[idx].path}
                </div>
            </React.Fragment>
        })}
    </div>
}

export {Row, Total}
