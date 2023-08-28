import {useContext} from 'react'
import './Cell.css'

import {TableContext} from './context'

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
    const {expandComponent, shrinkComponent} = useContext(TableContext)

    let cls = ['cell']
    if (selected) {
        cls.push('selected')
    }
    const border = lastRow ? <div className='border'></div> : <></>

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
            className={cls.join(' ')}
            onClick={() => {
                selected ? shrinkComponent(col) : expandComponent(col, data.type, data.id)
            }}>
            <div className='name'>{name(data.id)}</div>
            <br/>
            <div className='type'>{data.type}</div>
            {/* <code>{code}</code> */}

            {/* <SyntaxHighlighter className='code' language='go' style={docco}>
            {code}
        </SyntaxHighlighter> */}

            {border}
        </div>
    </>
}

function Empty({border, overlay}) {
    const b = border ? <div className='border'></div> : <></>
    const o = overlay ? <div className='overlay'>
        <div className='text'>No Components</div>
    </div> : <></>
    return <div className='cell'>{o}{b}</div>
}

export {Cell, Empty}
