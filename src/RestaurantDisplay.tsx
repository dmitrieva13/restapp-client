import { useState } from 'react'
import './style/AllRestPage.css'

function RestaurantDisplay(props: {name: string, address: string, img: string}) {

  return (
    <div className="restaurantIcon">
        <div className="restaurantImage">
            {props.img}
        </div>
        <div className="restaurantName">
            {props.name}
        </div>
        <div className="restaurantAddress">
            {props.address}
        </div>
    </div>
  )
}

export default RestaurantDisplay