import { useState } from 'react'

import Table from './Table'
import { TableContext } from "./context"
import Overview from './Overview'
import { Routes, Route, Link } from 'react-router-dom'
import { files, registry } from '.'

function App({ initTable }) {
  const [table, setTable] = useState(initTable)
  const expandComponent = (col, type, id) => {
    let newTable = table.slice(0, col + 1)
    newTable[col].forEach((c) => { c.selected = c.type === type && c.id === id })

    let c = registry.find((c) => c.type === type && c.id === id)
    if (c.direct_deps != null) {
      var deps = c.direct_deps.map((d) => registry.find((c) => c.type === d.type && c.id === d.id))
      newTable.push(deps.map((c) => ({
        type: c.type,
        id: c.id,
        path: c.file,
        file: files[c.file_full_path],
        line_start: c.line_start,
        line_end: c.line_end,
      })))
    } else {
      newTable.push([])
    }

    setTable(newTable)
  }

  const shrinkComponent = (col) => {
    let newTable = table.slice(0, col + 1)
    newTable[col].forEach((c) => { c.selected = false })
    setTable(newTable)
  }

  return (
    <TableContext.Provider value={{ expandComponent, shrinkComponent }}>
      <header>
        <Link to='/'>Overview</Link>
        <Link to='/table'>Table</Link>
      </header>
      <Routes>
        <Route path='/' element={<Overview />}></Route>
        <Route path='/table' element={<Table data={table} />}></Route>
        <Route path='*' element={<Overview />}></Route>
      </Routes>
    </TableContext.Provider>
  );
}

export default App
