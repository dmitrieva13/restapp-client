import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  return (
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
                            onChange={e => restaurantIdSet(e.target.value)} />
                    <div className="smallTextBlock">будет отображаться в ссылке</div>
                </div>
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
        <div className="triangleBlock" style={{marginTop: `${240 + (scrIndex >= 0 ? scrIndex * 50 : 0)}px`}}>
            {/* <div className="verticalBorder"></div> */}
        </div>}
        {scrIndex >= 0 &&
        <NewScreen screenIndex={scrIndex} infos={screens[scrIndex]} 
        infosChange={setScreen}/>
        }
    </div>
  )
}

export default CreateRestPage