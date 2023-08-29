import {useContext} from 'react'

import './Cell.css'
import {Context} from '../context'
import InfoIcon from "../Icons/Info";

// import SyntaxHighlighter from 'react-syntax-highlighter'
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const name = (id) => {
    if (id === '') {
        return '(No ID)'
    }

    return id
}

function countLeadingTabs(s) {
    let c = 0
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) === '\t') {
            c++
        } else {
            break
        }
    }
    return c
}

function trimLeadingTabs(s, n) {
    let start = 0
    for (let i = 0; i < n; i++) {
        if (s.charAt(i) === '\t') {
            start++
        } else {
            break
        }
    }
    return s.substring(start, s.length)
}

function Cell({col, data, selected, lastRow}) {
    const {expandComponent, shrinkComponent} = useContext(Context)

    const classSelected = (selected) ? 'selected' : ''
    const classFirst = (col === 0) ? 'first' : ''
    const classSecond = (col === 1) ? 'second' : ''
    const border = lastRow ? <div className={`border ${classFirst}`}></div> : <></>

    // let code_lines = data.file.slice(data.line_start, data.line_end)
    // let nTabs = 0
    // let code = code_lines.map((l, idx) => {
    //     if (idx === 0) {
    //         nTabs = countLeadingTabs(l)
    //     }

    //     return trimLeadingTabs(l, nTabs)
    // }).join('\n')

    return <>
        <div
            className={`cell ${classSelected} ${classFirst} ${classSecond}`}
            onClick={() => {
                selected ? shrinkComponent({col}) : expandComponent({col, type: data.type, id: data.id})
            }}>
            <div className='name'>{name(data.id)}</div>
            <br/>
            <div className='type'>{data.type}</div>
            <div className='actions'>
                <div className='info'><InfoIcon/></div>
            </div>
            {/* <code>{code}</code> */}

            {/* <SyntaxHighlighter className='code' language='go' style={docco}>
            {code}
        </SyntaxHighlighter> */}

            {border}
        </div>
    </>
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
