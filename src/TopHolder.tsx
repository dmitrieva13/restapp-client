import { useState } from 'react'
import './style/TopHolder.css'

function TopHolder(props: {name: string}) {

  return (
    <div className='topBlock'>
        <div className="restaurantName">
            {props.name}
        </div>
    </div>
  )
}

export default TopHolder