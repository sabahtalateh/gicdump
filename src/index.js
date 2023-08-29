import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

export const registry = window.data.initialized
export const files = window.data.files

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App components={registry}/>
        </BrowserRouter>
    </React.StrictMode>
)
