import React from 'react'

import {registry} from './index'

const expandComponent = ({table, setTable}) => ({col, type, id, infoOpened}) => {
    console.log(infoOpened)

    let newTable = table.slice(0, col + 1)
    newTable[col].forEach((c) => {
        c.selected = c.type === type && c.id === id
    })

    let c = registry.find((c) => c.type === type && c.id === id)
    if (c.direct_deps != null) {
        const deps = c.direct_deps.map((d) => registry.find((c) => c.type === d.type && c.id === d.id));
        newTable.push(deps.map((c) => ({
            type: c.type,
            id: c.id,
            infoOpened: infoOpened !== undefined && infoOpened.type === c.type && infoOpened.id === c.id,
            // path: c.file,
            // file: files[c.file_full_path],
            // line_start: c.line_start,
            // line_end: c.line_end,
        })))
    } else {
        newTable.push([])
    }

    setTable(newTable)
}

const shrinkComponent = ({table, setTable}) => ({col}) => {
    let newTable = table.slice(0, col + 1)
    newTable[col].forEach((c) => {
        c.selected = false
    })
    setTable(newTable)
}
const Context = React.createContext()

export {Context, expandComponent, shrinkComponent}
