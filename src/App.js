import './App.css'

import React from 'react'

import {useState} from 'react'
import {Routes, Route, Link, useLocation} from 'react-router-dom'
import Pluralize from 'pluralize'

import {Context, expandComponent, shrinkComponent} from './context'
import ComponentsTable from './ComponentsTable/Table'
import StagesTable from './StagesTable/Table'
import ComponentsIcon from './Icons/Components'
import ArrowsSpinIcon from './Icons/ArrowsSpin'
import Search from './Search'
import ComponentInfo from './ComponentInfo'
import {componentStages, filterComponents} from './components'
import {stages} from './index'
import {stageTable} from './stages'

function App({components, files}) {
    const [componentsTable, setComponentsTable] = useState([
        components.map((c) => ({type: c.type, id: c.id, order: c.order, selected: false, infoOpened: false}))
    ])
    const [stgTable, setStgTable] = useState(stageTable(''))

    const loc = useLocation()

    const [componentSearch, setComponentSearch] = useState('')
    const [stageSearch, setStageSearch] = useState('')
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
        setSearchValue = function (search) {
            setStageSearch(search);
            setStgTable(stageTable(search))
        }
    }

    const [componentInfo, setComponentInfo] = useState(undefined)
    const componentInfoComponent = (componentInfo !== undefined) ?
        <ComponentInfo component={componentInfo} close={() => setComponentInfo(undefined)}/> :
        <React.Fragment></React.Fragment>

    const componentsSelectClass = (loc.pathname === '/') ? 'selected' : ''
    const stagesSelectClass = (loc.pathname === '/stages') ? 'selected' : ''

    return (<Context.Provider value={{
        expandComponent: expandComponent({table: componentsTable, setTable: setComponentsTable}),
        shrinkComponent: shrinkComponent({table: componentsTable, setTable: setComponentsTable}),
        toggleComponentInfo: ({type, id}) => {
            if (componentInfo !== undefined && componentInfo.type === type && componentInfo.id === id) {
                setComponentInfo(undefined)
                return
            }

            const component = components.find(c => c.type === type && c.id === id)
            let lines = null
            let startLine = 0
            if (component !== undefined) {
                if (component.file !== '' && files !== null && files[component.file] !== undefined) {
                    const file = files[component.file]
                    lines = file.slice(component.line_start, component.line_end)
                    startLine = component.line_start + 1
                }

                setComponentInfo({
                    type: component.type,
                    id: component.id,
                    order: component.order,
                    file: component.file,
                    lines: lines,
                    start_line: startLine,
                    stages: componentStages({type: component.type, id: component.id})
                })
            }
        },
    }}>
        {componentInfoComponent}
        <header className='header'>
            <Link className='link' to='/'>
                <div className={`section ${componentsSelectClass}`}>
                    <div className='icon'><ComponentsIcon/></div>
                    <div className='section-header'>
                        {components.length} {Pluralize('component', components.length)}
                    </div>
                </div>
            </Link>
            <Link className='link' to='/stages'>
                <div className={`section ${stagesSelectClass}`}>
                    <div className='icon'><ArrowsSpinIcon/></div>
                    <div className='section-header'>{stages.length} {Pluralize('stage', stages.length)}</div>
                </div>
            </Link>
            <a className='link'>
                <Search value={searchValue} setValue={setSearchValue}/>
            </a>
        </header>
        <Routes>
            <Route path='/' element={
                <ComponentsTable data={componentsTable} rows={components.length} infoOpened={componentInfo}/>}>
            </Route>
            <Route path='/stages' element={<StagesTable data={stgTable} infoOpened={componentInfo}/>}></Route>
            <Route path='*' element={
                <ComponentsTable data={componentsTable} rows={components.length} infoOpened={componentInfo}/>}>
            </Route>
        </Routes>
    </Context.Provider>);
}

export default App
