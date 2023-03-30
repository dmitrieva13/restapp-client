import { useState, useEffect } from 'react'
import './style/User.css'

function User() {
    const [fetched, fetchedSet] = useState(0)

    let userData = {
        username: 'michaelis',
        icon: 'icon',
        job: 'Владелец',
        restauramt: [
            {id:'dorsia',
             restaurantName: 'Dorsia'
        }, {
            id:'casabonita',
            restaurantName: 'Casa Bonita'
        }],
        bonuses: null
    }

    useEffect(() => {
        if (!fetched){
            if (userData.job == null) {
                let jobClass = document.querySelector(".userJob")
                if (jobClass != null) {
                    jobClass.className += " invisible"
                }
            }
            if (userData.bonuses == null) {
                let bonusesClass = document.querySelector(".userBonuses")
                if (bonusesClass != null) {
                    bonusesClass.className += " invisible"
                }
            }
            if (userData.job == null || userData.job == 'Владелец') {
                let orderClass = document.querySelector(".takeOrder")
                if (orderClass != null) {
                    orderClass.className += " invisible"
                }
            }
            if (userData.job == null || userData.job == 'Официант') {
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
    })
    
    return(
        <div className="userPage">
            <div className="userIcon">
                {userData.icon}
            </div>
            <div className="userName">
                {userData.username}
            </div>
            <div className="userJob">
                {userData.job != null ? 
                <div className='jobInfo'>
                    <div>{userData.job} в ресторане(-ах): </div>
                    {userData.restauramt.map((rest, i) => {
                        return(
                            <div key={i} className="restaurantName">{rest.restaurantName}</div>
                        )
                    })}
                </div>

                 : ''}
            </div>
            <div className="userBonuses">
                {userData?.bonuses != null ? 
                userData.bonuses + " бонусов" : ''}
            </div>
            <div className="userButtons">
                <button className='userButton takeOrder'>
                    ПРИНЯТЬ ЗАКАЗ
                </button>
                <button className='userButton addRestaurant'>
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