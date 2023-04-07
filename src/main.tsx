import React from 'react'
import ReactDOM from 'react-dom/client'
import {Routes, Route} from 'react-router-dom'

import App from './App'
import {
    BrowserRouter as Router,
  } from "react-router-dom";
  

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Router>
        <App />
    </Router>
)
