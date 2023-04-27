import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/User.css'
import TopHolderUser from './TopHolderUser'

function User() {
    const [fetched, fetchedSet] = useState(0)
    const [username, usernameSet] = useState("")
    const [role, roleSet] = useState("")
    const [restId, restIdSet] = useState("")
    const [restName, restNameSet] = useState("")
    const [bonuses, bonusesSet] = useState("")

    // let userData = {
    //     username: 'michaelis',
    //     icon: 'icon',
    //     job: 'Владелец',
    //     restauramt: [
    //         {id:'dorsia',
    //          restaurantName: 'Dorsia'
    //     }, {
    //         id:'casabonita',
    //         restaurantName: 'Casa Bonita'
    //     }],
    //     bonuses: null
    // }

    const navigate = useNavigate()

    let goToRestaurantCreate = () => {
        navigate("/create_rest")
    }

    let goToRestaurantPage = (id: string) => {
        navigate("/" + id)
    }

    useEffect(() => {
        let roleInfo = localStorage.getItem("role") || ""
        let bonusesInfo = localStorage.getItem("bonuses") || ""
        let id = localStorage.getItem("restaurant") || ""
        usernameSet(localStorage.getItem("username") || "")
        roleSet(localStorage.getItem("role") || "")
        restIdSet(localStorage.getItem("restaurant") || "")
        bonusesSet(localStorage.getItem("bonuses") || "")
            if (roleInfo.length == 0) {
                let jobClass = document.querySelector(".userJob")
                if (jobClass != null) {
                    jobClass.className += " invisible"
                }
            } else {
                if (!fetched) {
                    // fetchedSet(1)
                    fetch("https://restapp.onrender.com/restaurant", {
                        method: "POST",
                        body: JSON.stringify({restaurant_id: id}),
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                    }
                    ).then(res=>res.json())
                    .then(response=>{
              
                      fetchedSet(1)
                      restNameSet(response.name)
              
                      console.log(response)
                      // addessSet(response.restaurant.address)
                      // contactsSet(response.restaurant.contacts)
                      // descriptonSet(response.restaurant.description)
              
                      // let wh = response.restaurant.working_hours
                      // workingHoursSet(wh.split("\n"))
                    })
                    .catch(error=>{console.log(error)})
                }
            }
            if (bonusesInfo.length == 0) {
                let bonusesClass = document.querySelector(".userBonuses")
                if (bonusesClass != null) {
                    bonusesClass.className += " invisible"
                }
            }
            if (roleInfo.length == 0 || roleInfo != 'waiter') {
                let orderClass = document.querySelector(".takeOrder")
                if (orderClass != null) {
                    orderClass.className += " invisible"
                }
            }
            if (roleInfo.length == 0 || roleInfo != 'owner') {
                let addRestClass = document.querySelector(".addRestaurant")
                if (addRestClass != null) {
                    addRestClass.className += " invisible"
                }
                let addWorkerClass = document.querySelector(".addWorker")
                if (addWorkerClass != null) {
                    addWorkerClass.className += " invisible"
                }
            }
        }
    )
    
    return(
        <div className="userPage">
            <TopHolderUser />
            <div className="userIcon">
            </div>
            <div className="userName">
                {username}
            </div>
            <div className="userJob">
                {role.length > 0 ? 
                <div className='jobInfo'>
                    <div>{role} в ресторане(-ах): </div>
                    <div className="userRestaurantName" onClick={e => goToRestaurantPage(restId)}>
                        {restName}
                    </div>
                    {/* {userData.restauramt.map((rest, i) => {
                        return(
                            <div key={i} className="userRestaurantName">{rest.restaurantName}</div>
                        )
                    })} */}
                </div>

                 : ''}
            </div>
            <div className="userBonuses">
                {bonuses.length > 0 ? bonuses + " бонусов" : ''}
            </div>
            <div className="userButtons">
                <button className='userButton takeOrder'>
                    ПРИНЯТЬ ЗАКАЗ
                </button>
                <button className='userButton addRestaurant' onClick={goToRestaurantCreate}>
                    СОЗДАТЬ РЕСТОРАН
                </button>
                <button className='userButton addWorker'>
                    ДОБАВИТЬ РАБОТНИКА
                </button>
            </div>
        </div>
    )
}

export default User