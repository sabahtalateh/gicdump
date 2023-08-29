import './App.css'

import {useState} from 'react'
import {Routes, Route, Link, useLocation} from 'react-router-dom'
import Pluralize from 'pluralize'

import {Context, expandComponent, shrinkComponent} from './context'
import ComponentsTable from './ComponentsTable/Table'
import Stages from './Stages/Stages'
import ComponentsIcon from './Icons/Components'
import ArrowsSpinIcon from './Icons/ArrowsSpin'
import Search from './Search'

const filterComponents = ({components, search, selected}) => {
    const filtered = components.filter((c) => {
        if (selected !== undefined && c.type === selected.type && c.id === selected.id) {
            return true
        }

        search = search.toLowerCase()
        const type = c.type.toLowerCase()
        const id = c.id.toLowerCase()

        return type.includes(search) || id.includes(search)
    })

    return filtered.map(c => ({
        type: c.type,
        id: c.id,
        selected: selected !== undefined && c.type === selected.type && c.id === selected.id,
    }))
}

function App({components}) {
    const [componentsTable, setComponentsTable] = useState([
        components.map((c) => ({type: c.type, id: c.id, selected: false}))
    ])
    const [componentSearch, setComponentSearch] = useState('')
    const [stageSearch, setStageSearch] = useState('')

    const loc = useLocation()
    const componentsSelectClass = (loc.pathname === '/') ? 'selected' : ''
    const stagesSelectClass = (loc.pathname === '/stages') ? 'selected' : ''

    let searchValue, setSearchValue
    if (loc.pathname === '/') {
        searchValue = componentSearch
        setSearchValue = function (search) {
            setComponentSearch(search)
            const selected = componentsTable[0].find((c) => c.selected)
            setComponentsTable([
                filterComponents({components, search, selected}),
                ...componentsTable.slice(1)
            ])
        }
    } else {
        searchValue = stageSearch
        setSearchValue = setStageSearch
    }

    return (<Context.Provider value={{
        expandComponent: expandComponent({table: componentsTable, setTable: setComponentsTable}),
        shrinkComponent: shrinkComponent({table: componentsTable, setTable: setComponentsTable}),
    }}>
        <header className='header'>
            <Link className='link' to='/'>
                <div className={`section ${componentsSelectClass}`}>
                    <div className='icon'><ComponentsIcon/></div>
                    <div
                        className='section-header'>{components.length} {Pluralize('component', components.length)}</div>
                </div>
            </Link>
            <Link className='link' to='/stages'>
                <div className={`section ${stagesSelectClass}`}>
                    <div className='icon'><ArrowsSpinIcon/></div>
                    <div className='section-header'>{1} {Pluralize('stage', 1)}</div>
                </div>
            </Link>
            <a className='link'>
                <Search value={searchValue} setValue={setSearchValue}/>
            </a>
        </header>
        <Routes>
            <Route path='/' element={<ComponentsTable data={componentsTable} rows={components.length}/>}></Route>
            <Route path='/stages' element={<Stages/>}></Route>
            <Route path='*' element={<ComponentsTable data={componentsTable} rows={components.length}/>}></Route>
        </Routes>
    </Context.Provider>);
}

export default App
