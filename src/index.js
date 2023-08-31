import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {HashRouter} from 'react-router-dom'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

export const registry = window.data.initialized
export const files = window.data.files
export const stages = window.data.stages
export const stageImpls = window.data.stage_impls

root.render(
    <React.StrictMode>
        <HashRouter>
            <App components={registry} files={files}/>
        </HashRouter>
    </React.StrictMode>
)
