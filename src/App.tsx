import React from 'react'
import './style/App.css'
import {Routes, Route} from 'react-router-dom'

import Restaurant from './Restaurant'
import AllRestaurants from './AllRestPage'
import User from './User'

const App = () => {
  return(
    <Routes>
        <Route path='/' element={<AllRestaurants/>}/>
        <Route path='/:restaurantId' element={<Restaurant/>}/>
        <Route path='/user/:user' element={<User/>}/>
    </Routes>
  )
}

export default App;