import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import Home from './components/Home/home'
import Settings from './components/SettingsPage/settings'

import { HashRouter, Route, Routes} from 'react-router-dom'


import './i18next'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      
      <HashRouter>
        <Routes>
          
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/settings' element={<Settings />} />
          </Route>

        </Routes>
      </HashRouter>
  </React.StrictMode>
)
