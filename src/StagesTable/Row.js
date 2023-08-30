import React from 'react'

import './Row.css'

import {Cell, Empty} from './Cell'

function Header({data}) {
    return <div className='row stages-header'>
        {data.map((s, idx) => {
            const parallel = (s.parallel) ? 'parallel' : 'non-parallel'
            const topBorder = (idx === 0) ? <div className='top-border' key={'brd' + idx}></div> : <></>
            return <React.Fragment key={idx}>
                {topBorder}
                <div className={`cell`} key={'header' + idx}>
                    {s.id}
                    <br/>
                    {s.order}
                    <br/>
                    {parallel}
                </div>
            </React.Fragment>
        })}
    </div>
}

function Row({data, firstRow, lastRow}) {
    const topBorder = firstRow ? <div className='top-border'></div> : <></>
    return <div className='row'>
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

export {Row, Header}
