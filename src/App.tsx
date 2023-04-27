import React from 'react'
import './style/App.css'
import {Routes, Route} from 'react-router-dom'

import Restaurant from './Restaurant'
import AllRestaurants from './AllRestPage'
import User from './User'
import NewScreen from './NewScreen'
import CreateRestPage from './CreateRestPage'
import EmployeeLogin from './EmployeeLogin'
import Login from './Login'

const App = () => {
  return(
    <Routes>
        <Route path='/' element={<AllRestaurants/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user/:user' element={<User/>}/>
        <Route path='/create_rest' element={<CreateRestPage/>}/>
        <Route path='/elogin' element={<EmployeeLogin/>}/>
        <Route path='/:restaurantId' element={<Restaurant/>}/>
    </Routes>
  )
}

export default App;