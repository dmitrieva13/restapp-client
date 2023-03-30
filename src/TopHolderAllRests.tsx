import { useState } from 'react'
import './style/TopHolderAllRests.css'

function TopHolderAll(props: {name: string}) {

  return (
    <div className='topBlock'>
        <div className="appTitle">RestApp</div>
        <div className="user">{props.name}</div>
    </div>
  )
}

export default TopHolderAll