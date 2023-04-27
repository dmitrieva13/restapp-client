import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/TopHolderRest.css'

function TopHolder(props: {name: string, user: string}) {
  const navigate = useNavigate()

  let goToPath = () => {
      navigate("/")
  }

  let goToUser = () => {
    navigate("/user/" + props.user)
  }

  let goToLogin = () => {
    navigate("/login")
  }

if (props.user) {
  return (
    <div className='topBlock'>
        <div className="restaurantName" onClick={goToPath}>
            {props.name}
        </div>
        <div className="userRest" onClick={goToUser}>{props.user}</div>
    </div>
  )
} else {
  return (
    <div className='topBlock'>
    <div className="restaurantName" onClick={goToPath}>
        {props.name}
    </div>
    <div className="userRest" onClick={goToLogin}>Войти</div>
</div>
  )
}
}

export default TopHolder