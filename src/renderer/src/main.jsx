import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import { HashRouter, Route, Routes} from 'react-router-dom'


import './i18next'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}> </Route>
        </Routes>
      </HashRouter>
  </React.StrictMode>
)
