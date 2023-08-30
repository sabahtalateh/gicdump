import {useContext} from 'react'

import './Cell.css'
import {Context} from '../context'
import InfoIcon from "../Icons/Info";

const name = (id) => {
    if (id === '') {
        return '(No ID)'
    }

    return id
}

function Cell({col, data, selected, lastRow}) {
    const {expandComponent, shrinkComponent, toggleComponentInfo} = useContext(Context)

    const classSelected = (selected) ? 'selected' : ''
    const classFirst = (col === 0) ? 'first' : ''
    const classSecond = (col === 1) ? 'second' : ''
    const border = lastRow ? <div className={`border ${classFirst}`}></div> : <></>

    return <div
        className={`cell ${classSelected} ${classFirst} ${classSecond}`}
        onClick={() => {
            selected ? shrinkComponent({col}) : expandComponent({col, type: data.type, id: data.id})
        }}>
        <div className='name'>{name(data.id)}</div>
        <br/>
        <div className='type'>{data.type}</div>
        <div className='actions'>
            <div className='info'
                 onClick={(e) => {
                     e.stopPropagation()
                     toggleComponentInfo({type: data.type, id: data.id})
                 }}>
                <InfoIcon/>
            </div>
        </div>
        {border}
    </div>
}

function Empty({col, border, overlay}) {
    const classFirst = (col === 0) ? 'first' : ''

    const b = border ? <div className={`border ${classFirst}`}></div> : <></>
    const o = overlay ? <div className='overlay'>
        <div className='text'>No Components</div>
    </div> : <></>
    return <div className={`cell ${classFirst}`}>
        <div className='name'></div>
        <br/>
        <div className='type'></div>
        {o}{b}
    </div>
}

export {Cell, Empty}