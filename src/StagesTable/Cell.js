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

function Cell({data, lastRow}) {
    const {toggleComponentInfo} = useContext(Context)
    const border = lastRow ? <div className={`border`}></div> : <></>

    return <div
        className={`cell`}>
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

function Empty({border, overlay}) {
    const b = border ? <div className={`border`}></div> : <></>
    const o = overlay ? <div className='overlay'>
        <div className='text'>No Components</div>
    </div> : <></>
    return <div className={`cell`}>
        <div className='name'></div>
        <br/>
        <div className='type'></div>
        {o}{b}
    </div>
}

export {Cell, Empty}
