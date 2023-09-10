import { useState } from 'react'
import './style/CreateRestPage.css'
import NewScreen from './NewScreen'

function CreateRestPage() {
//   const navigate = useNavigate()

//   let goToUser = () => {
//       navigate("/user/" + props.name)
//   }
    const emptyInfo = {
        title: "",
        text: "",
        images: []
    }

    const emptyScreen = {
        titles: [],
        texts: [],
        imgs: []
    }

    const [restaurantName, restaurantNameSet] = useState("")
    const [restaurantId, restaurantIdSet] = useState("")
    const [screens, screensSet] = useState<any[5]>([emptyScreen,emptyScreen,emptyScreen,emptyScreen,emptyScreen])
    const [scrIndex, scrIndexSet] = useState(-1)
    const [colors, colorsSet] = useState<any[5]>(["rgb(100, 100, 100)","rgb(100, 100, 100)", "rgb(100, 100, 100)", "rgb(100, 100, 100)", "rgb(100, 100, 100)"])
    const [screensVisible, screensVisibleSet] = useState(1)
    const [fetched, fetchedSet] = useState(0)
    const [workingHours, workingHoursSet] = useState<any[7]>(['','','','','','',''])
    const [address, addressSet] = useState('')
    const [contacts, contactsSet] = useState('')
    const [description, descriptionSet] = useState('')

    const weekdays = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

    let makeVisisble = (className: string) => {
        let divClass = document.querySelector("." + className)
        if (divClass != null) {
          divClass.className = className
        }
      }
    
      let makeInvisisble = (className: string) => {
        let divClass = document.querySelector("." + className)
        if (divClass != null) {
          divClass.className += " invisible"
        }
      }

    let setScreen = (scr: any, i: number) => {
        let newArr = [...screens]
        newArr[i] = scr
        screensSet(newArr)
    }

    let colorScreen = (i: number) => {
        let newArr = [...colors]
        newArr.map((color: any, indx: number) => {
            if (indx == i) {
                newArr[indx] = "rgb(0, 0, 0)"
            } 
            else {
                newArr[indx] = "rgb(100, 100, 100)"
            }
        })
        colorsSet(newArr)
    }

    let selectScreen = (i: number) => {
        scrIndexSet(i)
        colorScreen(i)
        console.log("screens: ", screens)
    }

    let idInputClicked = () => {
        let idInput = document.querySelector(".newRestIdInput")
        if (idInput != null) {
            idInput.className = "newRestIdInput"
        }
        let idError = document.querySelector(".Error")
        if (idError != null) {
            idError.className += " invisible"
        }
        let idInfo = document.querySelector(".IDinfo")
        if (idInfo != null) {
            idInfo.className = "smallTextBlock IDinfo"
        }
    }

    let workingHoursChanged = (i: number, value: any) => {
        let newArr = [...workingHours]
        newArr[i] = value
        workingHoursSet(newArr)
        console.log(workingHours);
    }

    let newScreenButtonClicked = () => {
        let screensCount = screensVisible + 1
        screensVisibleSet(screensCount)
        let screenDivs = Array.from(document.querySelectorAll(".createScreenText"))
        screenDivs.map((sDiv: any, i: number) => {
            if (sDiv.id < screensCount.toString()) {
                sDiv.className = "createScreenText"
            } else {
                sDiv.className = "createScreenText invisible"
            }
        })
        if (screensCount >= 5){
            let buttonDiv = document.querySelector(".newScreenButton")
            if (buttonDiv != null) {
                buttonDiv.className += " invisible"
            }
        }
        selectScreen(screensCount - 1)
    }

    let createRestButtonClicked = () => {
        let isEmpty = false
        if (restaurantName.length == 0) {
            let nameInput = document.querySelector(".newRestNameInput")
            if (nameInput != null) {
                nameInput.className += " invalid"
            }
            isEmpty = true
        }
        if (restaurantId.length == 0) {
            let idInput = document.querySelector(".newRestIdInput")
            if (idInput != null) {
                idInput.className += " invalid"
            }
            isEmpty = true
        }
        if (isEmpty) {
            return
        }
        
            fetch("https://restapp.onrender.com/restaurant", {
                method: "POST",
                body: JSON.stringify({restaurant_id: restaurantId}),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }
            ).then(res=>res.json())
            .then(response=>{
              console.log(!response)
              if (response.name) {
                let idInput = document.querySelector(".newRestIdInput")
                if (idInput != null) {
                    idInput.className += " invalid"
                }
                let idError = document.querySelector(".Error")
                if (idError != null) {
                    idError.className = "smallTextBlock Error"
                }
                let idInfo = document.querySelector(".IDinfo")
                if (idInfo != null) {
                    idInfo.className += " invisible"
                }
              } else {
                let finalScreens = []
                for (let i = 0; i < screens.length; i++) {
                    let count = 0
                    let tArr = []
                    let txtArr = []
                    let imArr = []
                    for (let ti = 0; ti < screens[i].titles.length; ti++) {
                        if (screens[i].titles[ti].length > 0) {
                            console.log("screen ",screens[i])
                            tArr.push(screens[i].titles[ti])
                            txtArr.push(screens[i].texts[ti])
                            imArr.push(screens[i].imgs[ti])
                            count++
                        }
                    }
                    if (count > 0) {
                        let scr = {
                            titles: tArr,
                            texts: txtArr,
                            imgs: imArr
                        }
                        finalScreens.push(scr)
                    }
                }

                let newRest = {
                    restaurant_id: restaurantId,
                    name: restaurantName,
                    screens: finalScreens
                }

                console.log("new", newRest)

                makeInvisisble("CreateRestPage")
                makeInvisisble("createButtonHolder")
                makeVisisble("createdSuccesfullyBlock")
                setTimeout(function(){
                makeVisisble("CreateRestPage")
                makeVisisble("createButtonHolder")
                makeInvisisble("createdSuccesfullyBlock")
                }, 2000)
              }
              // addessSet(response.restaurant.address)
              // contactsSet(response.restaurant.contacts)
              // descriptonSet(response.restaurant.description)
      
              // let wh = response.restaurant.working_hours
              // workingHoursSet(wh.split("\n"))
            })
            .catch(error=>{console.log(error)})
    }

  return (
    <div className='CreateRest'>
        <div className="createdSuccesfullyBlock invisible">
            <div className="successText">
              Ресторан успешно создан!
            </div>
        </div>
        <div className="helpIconBlock">
                <button className="helpButton">?</button>
        </div>
        <div id="helpWindow" className="helpWindow">
            <div className="helpContent">
                <button className="closeButton">&times;</button>
                <div className="helpText">
                    <p>Some text in the Modal..</p>
                </div>
            </div>

</div>
        <div className='CreateRestPage'>
            <div className="createRestInfoBlock">
                <div className="createRestName">
                    <div className="createRestTextBlock">Название ресторана:</div>
                    <input className="newRestNameInput" type="text" maxLength={30} value={restaurantName}
                                onChange={e => restaurantNameSet(e.target.value)} />
                </div>
                <div className="createRestId">
                    <div className="createRestTextBlock">ID ресторана:</div>
                    <div className="IdInputBlock">
                        <input className="newRestIdInput" type="text" maxLength={30} value={restaurantId}
                                onChange={e => restaurantIdSet(e.target.value)} 
                                onClick={idInputClicked} />
                        <div className="smallTextBlock Error invisible">ресторан с таким ID уже существует!</div>
                        <div className="smallTextBlock IDinfo">будет отображаться в ссылке</div>
                    </div>
                </div>
                <div className="createRestAddress">
                    <div className="createRestTextBlock">Адрес ресторана:</div>
                    <input className="newRestAddressInput" type="text" maxLength={500} value={address}
                                onChange={e => addressSet(e.target.value)} />
                </div>
                <div className="createRestContacts">
                    <div className="createRestTextBlock">Контакты ресторана:</div>
                    <input className="newRestContactsInput" type="text" maxLength={500} value={contacts}
                                onChange={e => contactsSet(e.target.value)} />
                </div>
                <div className="createRestWH">
                    <div className="createRestTextBlock">Часы работы:</div>
                    <div className="WorkingHoursBlock">
                        {weekdays.map((day: any, i: number) => {
                            let k1 = "block" + i
                            let k2 = "text" + i
                            let k3 = "input" + i
                            return(
                                <div className="workingHours" key={k1}>
                                    <div className="weekdayText" key={k2}>{day}</div>
                                    <input className="whDayInput" key={k3} type="text" maxLength={50} value={workingHours[i]}
                                        onChange={e => workingHoursChanged(i, e.target.value)} />
                                </div>)
                        })}
                    </div>
                </div>
                <div className="createRestDescription">
                    <div className="createRestTextBlock">Описание:</div>
                    <input className="newRestDescrInput" type="text" maxLength={1000} value={description}
                                onChange={e => descriptionSet(e.target.value)} />
                </div>
                <div className='createRestScreensBlock'>
                    <div className='createRestTextBlock'>Экраны:</div>
                    {screens.map((scr: any, i: number) => {
                        console.log(i)
                        let idStr = i.toString()
                        let cname = i == 0 ? "createScreenText" : "createScreenText invisible"
                        return(
                            <div className={cname} key={i} id={idStr}
                            style={{color: `${colors[i]}`}}
                            onClick={e => selectScreen(i)}>
                                Экран {i + 1}
                            </div>
                        )
                    })}
                    <button className='newScreenButton' onClick={newScreenButtonClicked}>ДОБАВИТЬ ЭКРАН</button>
                </div>
            </div>
            {scrIndex >= 0 &&
            <div className="triangleBlock" style={{marginTop: `${600 + (scrIndex >= 0 ? scrIndex * 50 : 0)}px`}}>
                {/* <div className="verticalBorder"></div> */}
            </div>}
            {scrIndex >= 0 &&
            <NewScreen screenIndex={scrIndex} infos={screens[scrIndex]} 
            infosChange={setScreen}/>
            }
        </div>
        <div className="createButtonHolder">
            <button className='saveRestButton' onClick={createRestButtonClicked}>СОЗДАТЬ РЕСТОРАН</button>
        </div>
    </div>
  )
}

export default CreateRestPage