import { useState } from 'react'
import './style/RestaurantButtons.css'

function Buttons() {
  return (
    <div className='buttonsBlock'>
        <button className='menu'>
            <a href='/menu'>ПОСМОТРЕТЬ МЕНЮ</a>
        </button>
        <button className='booking'>
            <a href='/booking'>ЗАКАЗАТЬ СТОЛИК</a>
        </button>
    </div>
  )
}

export default Buttons