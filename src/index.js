import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

export const registry = window.data.initialized
export const files = window.data.files

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App initTable={[registry.map((c) => ({ 
        type: c.type, 
        id: c.id,
        path: c.file,
        file: files[c.file_full_path],
        line_start: c.line_start,
        line_end: c.line_end,
      }))]} />
    </BrowserRouter>
  </React.StrictMode>
)
