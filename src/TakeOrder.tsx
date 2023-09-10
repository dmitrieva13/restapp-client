import { useEffect, useState } from 'react'
import './style/TakeOrder.css'

function TakeOrder() {
    const [loaded, loadedSet] = useState(0)
    const [username, usernameSet] = useState("")
    const [sum, sumSet] = useState("0")
    const [bonusesUsed, bonusesUsedSet] = useState("0")
    const [maxBonuses, maxBonusesSet] = useState("0")
    const [usernameChecked, usernameCheckedSet] = useState(false)
    const [isCheckClicked, isCheckClickedSet] = useState(false)
    const [resultBonuses, resultBonusesSet] = useState(0)

    useEffect(() => {
        if (!loaded) {
            bonusesUsedSet("0")
            maxBonusesSet("500")
            usernameCheckedSet(false)
            loadedSet(1)
        }
    })

    let getCurrentDateTime = () => {

        let date = new Date()
        let day = date.getDate() >= 10 ? date.getDate().toString() : "0" + date.getDate()
        let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1).toString() : "0"+(date.getMonth() + 1);
        let year = date.getFullYear();
        let dateStr = `${year}-${month}-${day}`
        let time = date.getHours() + ':' + date.getMinutes()
        
        return dateStr + ' ' + time
    }
        

    let usernameCheck = () => {
        if (!isCheckClicked) {
            isCheckClickedSet(true)
        }
        let isCorrect = true
        if (username.length == 0) {
            isCorrect = false
        }
        // fetch("https://restapp.onrender.com/user", {
        //                 method: "POST",
        //                 body: JSON.stringify({username: username}),
        //                 headers: {
        //                   'Accept': 'application/json',
        //                   'Content-Type': 'application/json'
        //                 }
        //             }).then(res=>res.json())
        //             .then(response=>{
              
        //               console.log(response)
        //               // addessSet(response.restaurant.address)
        //               // contactsSet(response.restaurant.contacts)
        //               // descriptonSet(response.restaurant.description)
              
        //               // let wh = response.restaurant.working_hours
        //               // workingHoursSet(wh.split("\n"))
        //             })
        //             .catch(error=>{console.log(error)})
        if (isCorrect) {
            usernameCheckedSet(true)
        }
    }

    let toChangeUser = () => {
        usernameCheckedSet(false)
        isCheckClickedSet(false)
        bonusesUsedSet("")
        maxBonusesSet("0")
    }

    let handleFloat = (str: string) => {
        let f = parseFloat(str.replace(/[^0-9.]/,'')).toString()
                console.log(f)
                if (str.replace(/[^0-9.]/,'').includes('.') && !f.includes('.')) {
                    f += '.'
                }
                if (f == "NaN") {
                    f = "0"
                }
                sumSet(f)
        
    }

    let bonusesChanged = (bonuses: string) => {
        if (parseInt(bonuses) > Math.trunc(0.5 * parseInt(sum))) {
            bonusesUsedSet(Math.trunc(0.5 * parseInt(sum)).toString())
        } else if (parseInt(bonuses) > parseInt(maxBonuses)) {
            bonusesUsedSet(maxBonuses)
            console.log("max");
            
        } else {
            bonusesUsedSet(bonuses)
        }
    }

    let getTotalSum = () => {
        let orderSum = sum.length == 0 ? '0' : sum
        let orderBonuses = bonusesUsed.length == 0 ? '0' : bonusesUsed
        return (parseFloat(orderSum) - parseFloat(orderBonuses)).toFixed(2)
    }

    let finishOrder = () => {
        resultBonusesSet(Math.trunc(0.1 * parseFloat(getTotalSum())))
        let orderInfo = {
            restaurant: localStorage.restaurant,
            datetime: getCurrentDateTime(),
            waiter: localStorage.username,
            client: username,
            orderSum: getTotalSum(),
            bonusesUsed: bonusesUsed,
            bonusesReceived: resultBonuses
        }
    }

    return (
        <div className='takeOrderPage'>
            <div className="orderTitle">Принятие заказа</div>
            <div className="orderInputs">
                <div className="usernameInputBlock">
                    <div className="orderTextBlock">Имя пользователя:</div>
                    <div className="wrappedInput">
                        <input className="usernameInput" type="text" maxLength={30} value={username}
                                    onChange={e => usernameSet(e.target.value)} 
                                    disabled={usernameChecked}/>
                        <div className="smallTextBlock errorText" hidden={usernameChecked || !isCheckClicked}>некорректное имя пользователя</div>

                    </div>
                </div>
                <div className="checkUserButtonBlock">
                    <button className='checkUserButton' hidden={usernameChecked} 
                    onClick={usernameCheck}>
                        ПОИСК ПОЛЬЗОВАТЕЛЯ
                    </button>
                    <button className='changeUserButton' hidden={!usernameChecked} 
                    onClick={toChangeUser}>
                        Изменить
                    </button>
                </div>
                <div className="sumInputBlock">
                    <div className="orderTextBlock">Сумма заказа:</div>
                    <input className="sumInput" type="text" maxLength={15} value={sum} 
                    onChange={event => {
                        handleFloat(event.target.value)
                // let f = parseFloat(event.target.value.replace(/[^0-9.]/,'')).toString()
                // console.log(f)
                // if (event.target.value.replace(/[^0-9.]/,'').includes('.') && !f.includes('.')) {
                //     f += '.'
                // }
                // if (f == "NaN") {
                //     f = "0"
                // }
                // sumSet(f)
            }} />
            </div>
            <div className="bonucesInputBlock">
                    <div className="orderTextBlock">Списать бонусы:</div>
                    <div className="wrappedInput">
                        <input className="bonuceInput" type="text" maxLength={15} value={bonusesUsed} 
                        onChange={event => {
                            bonusesChanged(event.target.value.replace(/[^0-9]/,''))
                }} />
                        <div className="smallTextBlock">
                            доступно {maxBonuses} бонусов, можно списать максимум {Math.trunc(0.5 * parseInt(sum)) < parseInt(maxBonuses) ? Math.trunc(0.5 * parseInt(sum)) : maxBonuses} бонусов
                        </div>
                    </div>

            </div>
            <div className="totalSumBlock">
                <div className="orderTextBlock">Сумма к оплате:</div>
                <div className="totalSumText">
                    {getTotalSum()} рублей
                </div>
            </div>
            <div className="getBonusesBlock">
                <div className="orderTextBlock">Будет начислено бонусов:</div>
                <div className="getBonusesText">
                    {Math.trunc(0.1 * parseFloat(getTotalSum()))}
                </div>
            </div>
            </div>
            <div className="finishOrderBlock">
            <button className='finishOrderButton' hidden={!usernameChecked} 
                    onClick={finishOrder}>
                        ЗАВЕРШИТЬ ЗАКАЗ
                    </button>
            </div>
        </div>
    )
}

export default TakeOrder