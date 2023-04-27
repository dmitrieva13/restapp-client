import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/TopHolderAllRests.css'

function TopHolderAll(props: {name: string}) {
  const navigate = useNavigate()

  let goToUser = () => {
      navigate("/user/" + props.name)
  }

  let goToLogin = () => {
      navigate("/login")
  }

  if (props.name) {
    return (
      <div className='topBlockAll'>
          <div className="appTitle">RestApp</div>
          <div className="user" onClick={goToUser}>{props.name}</div>
      </div>
    )
  } else {
    return (
        <div className='topBlockAll'>
            <div className="appTitle">RestApp</div>
            <div className="user" onClick={goToLogin}>Войти</div>
        </div>
    )
  }
}

export default TopHolderAll