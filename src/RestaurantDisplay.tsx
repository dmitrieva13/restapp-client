import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/AllRestPage.css'

function RestaurantDisplay(props: {id: string, name: string, address: string, 
  img: string, desc: string, wh: string, contacts: string}) {

  const navigate = useNavigate()

let goToPath = () => {
    navigate("/" + props.id)
}
  return (
    <div className="restaurantIcon" onClick={goToPath}>
        {/* <div className="restaurantImage">
            {props.img}
        </div> */}
        <div className="restName">
            {props.name}
        </div>
        <div className="restaurantInformation">
          <div className="restaurantAddress">
              {props.address}
          </div>
          <div className="restaurantContacts">
            {props.contacts}
          </div>
          <div className="hoursTitle">
            Время работы:
          </div>
          <div className="restaurantHours">
            {props.wh}
          </div>
        </div>
        <div className="restaurantDesc">
          {props.desc}
        </div>
    </div>
  )
}

export default RestaurantDisplay