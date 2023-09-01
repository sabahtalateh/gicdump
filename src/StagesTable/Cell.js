import './Cell.css'

import {useContext} from 'react'

import {Context} from '../context'
import InfoIcon from '../Icons/Info'

const name = (id) => {
    if (id === '') {
        return '(No ID)'
    }

    return id
}

function Cell({data, lastRow, infoOpened}) {
    const {toggleComponentInfo} = useContext(Context)
    const border = lastRow ? <div className={`border`}></div> : <></>
    const infoOpenedClass = (infoOpened !== undefined && (data.type === infoOpened.type && data.id === infoOpened.id)) ? 'opened' : ''

    return <div className={`cell`}>
        <div className='order'>[{data.order}]</div>
        <div className='name'>{name(data.id)}</div>
        <br/>
        <div className='type'>{data.type}</div>
        <div className={`actions ${infoOpenedClass}`}>
            <div className={`info ${infoOpenedClass}`}
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
