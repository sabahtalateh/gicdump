import SyntaxHighlighter from 'react-syntax-highlighter'
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs'

import './ComponentInfo.css'
import XMarkIcon from './Icons/XMark'
import ArrowsSpinIcon from "./Icons/ArrowsSpin";

const Code = ({lines, start}) => {
    return <SyntaxHighlighter
        className='code'
        language='go'
        showLineNumbers={true}
        startingLineNumber={start}
        style={docco}
    >
        {lines.join('\n')}
    </SyntaxHighlighter>
}

const ComponentInfo = ({component, close}) => {
    const id = (component.id === '') ? '(No ID for component set)' : component.id

    const code = (component.lines.length !== 0) ? <Code lines={component.lines} start={component.start_line}/> : <></>

    const stages = (component.stages.length === 0) ?
        <div className='stages'>No Stages</div> :
        <div className='stages'>Stages: {component.stages.map((s, i) =>
            <div key={i} className='stage'><span className='icon'><ArrowsSpinIcon/></span>{s.id}</div>
        )}</div>

    return <div className='component-info'>
        <div className='close' onClick={close}><XMarkIcon/></div>
        <div className='content'>
            <div className='type'>Type: <b>{component.type}</b></div>
            <div className='id'>ID: <b>{id}</b></div>
            {stages}
            <div className='file'>{component.file}</div>
            <div className='code'>{code}</div>
            <br/>
            <br/>
            <br/>
        </div>
    </div>
}

export default ComponentInfo
