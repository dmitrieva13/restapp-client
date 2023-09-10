import React from 'react'
import './style/App.css'
import {Routes, Route} from 'react-router-dom'

import Restaurant from './Restaurant'
import AllRestaurants from './AllRestPage'
import User from './User'
import CreateRestPage from './CreateRestPage'
import EmployeeLogin from './EmployeeLogin'
import Login from './Login'
import TakeOrder from './TakeOrder'

const App = () => {
  return(
    <Routes>
        <Route path='/' element={<AllRestaurants/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user/:user' element={<User/>}/>
        <Route path='/create_rest' element={<CreateRestPage/>}/>
        <Route path='/elogin' element={<EmployeeLogin/>}/>
        <Route path='/:restaurantId' element={<Restaurant/>}/>
        <Route path='/order' element={<TakeOrder/>}/>
    </Routes>
  )
}

export default App;