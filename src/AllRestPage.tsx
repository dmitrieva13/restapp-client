import { useState, useEffect, useRef } from 'react'
import './style/AllRestPage.css'
import TopHolderAll from './TopHolderAllRests'
import RestaurantDisplay from './RestaurantDisplay'

function AllResturants() {
let restArr = [
    {
        id: "dorsia",
        name: "Dorsia",
        address: "NY, Main st",
        image: "dorsia img"
},
{
    id: "casabonita",
        name: "Casa Bonita",
        address: "Chickago, Leaf st 14",
        image: "cb img"
}
]

    return(
        <div className="AllRestPage">
            <TopHolderAll name='michaelis' />
            <div className="restaurants">
                {restArr.map((restaurant, index) => {
                    return(
                        <RestaurantDisplay name={restaurant.name} 
                        address={restaurant.address} img={restaurant.image}/>
                    )
                })}
            </div>
        </div>
    )
}

export default AllResturants