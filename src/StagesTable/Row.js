import React from 'react'

import './Row.css'

import {Cell, Empty} from './Cell'
import ComponentsIcon from "../Icons/Components";

const StageOrder = ({order}) => {
    let value = <></>
    let caption = <></>
    if (order === 'InitOrder') {
        value = <div className='order'>Init Order</div>
        caption = <div className='order-caption'>same as components init order</div>
    } else if (order === 'ReverseInitOrder') {
        value = <div className='order'>Reverse Init Order</div>
        caption = <div className='order-caption'>in reverse to components init order</div>
    } else {
        value = <div className='order'>(No Order)</div>
    }

    return <>{value}{caption}<div className='order-border'></div></>
}

function Header({data}) {
    return <div className='row stages-header'>
        {data.map((s, idx) => {
            const parallelNote = (s.parallel && (s.order !== '')) ?
                <div className='parallel-note'>order not takes effect on parallel stage</div> :
                <></>

            const parallel = (s.parallel) ? 'Parallel' : 'NOT Parallel'
            const topBorder = (idx === 0) ? <div className='top-border' key={'brd' + idx}></div> : <></>
            return <React.Fragment key={idx}>
                {topBorder}
                <div className={`cell`} key={'header' + idx}>
                    <div className='id'>{s.id} <span className='components-icon'><ComponentsIcon/></span>{s.total}</div>
                    <StageOrder order={s.order}/>
                    <div className='parallel'>{parallel}</div>
                    {parallelNote}
                </div>
            </React.Fragment>
        })}
    </div>
}

function Row({data, firstRow, lastRow, infoOpened}) {
    const topBorder = firstRow ? <div className='top-border'></div> : <></>
    return <div className='row'>
        {topBorder}
        {data.map((c, idx) => {
            if (c !== undefined && !c.empty_overlay) {
                return <Cell key={idx} col={idx} data={c} selected={c.selected} lastRow={lastRow}
                             infoOpened={infoOpened}/>
            } else {
                const overlay = c !== undefined && c.empty_overlay
                return <Empty key={idx} border={lastRow} overlay={overlay}/>
            }
        })}
    </div>
}

export {Row, Header}
