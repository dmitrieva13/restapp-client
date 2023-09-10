import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/NewScreen.css'

function NewScreen(props: {screenIndex: any, infos: any, infosChange: any}) {
    const [titles, titlesSet] = useState<any[5]>(["","","","",""])
    const [textArr, textArrSet] = useState<any[5]>(["","","","",""])
    const [imgArr, imgArrSet] = useState<any[5]>([[],[],[],[],[]])
    const [currentImgArr, currentImgArrSet] = useState<any[3]>(["","",""])

    const [index, indexSet] = useState(0)
    const [titlesVisible, titlesVisibleSet] = useState(1)
    const [loaded, loadedSet] = useState(-1)
    const [initTitlesCount, initTitlesCountSet] = useState(1)

    const refText = useRef<any>(null)


    const handleSaveButtonClicked = () => {
        let savedInfo = {
            titles: [] as any[5],
            texts: [] as any[5],
            imgs: [] as any[5]
        }
        let newArr = [...imgArr]
        newArr[index] = currentImgArr
        imgArrSet(newArr)
        console.log(titles)
        let count = 0
        titles.map((title: any, i: number) => {
            console.log(title, " title")
            if (title != "") {
                console.log(newArr[i])
                savedInfo.titles[count] = title
                savedInfo.texts[count] = textArr[i]
                savedInfo.imgs[count] = newArr[i]
                count++
            }
        })
        for (let i = count; i < 5; i++) {
            savedInfo.titles[i] = ""
            savedInfo.texts[i] = ""
            savedInfo.imgs[i] = []
        }
        props.infosChange(savedInfo, props.screenIndex)
        console.log("saved ",savedInfo)
    }

    let addTitle = (title: string, id: number) => {
        let newArr = [...titles]
        newArr[id] = title
        titlesSet(newArr)
        console.log(titles)
    }

    let changeText = (text: string, id: number) => {
        let newArr = [...textArr]
        newArr[id] = text
        textArrSet(newArr)
    }

    let clearInputs = () => {
        let tDivs = Array.from(document.querySelectorAll(".newTitleInput"))
        tDivs.map((tDiv: any, i: number) => {
            tDiv.value = ""
        })
        if (refText.current != null) {
            console.log(refText.current.value)
            refText.current.value = ""

            console.log(refText.current.value, " changed?")
            // textDiv.setAttribute("value", "")
        }
        let iDivs = Array.from(document.querySelectorAll(".newImageInput"))
        iDivs.map((iDiv: any, i: number) => {
            iDiv.value = ""
        })
    }

    let resetAddedInputs = () => {
        let titleDivs = Array.from(document.querySelectorAll(".newTitle"))
        titleDivs.map((tDiv: any, i: number) => {
            if (tDiv.id == '0') {
                tDiv.className = "newTitle"
            } else {
                tDiv.className = "newTitle invisible"
            }
        })
        titlesVisibleSet(1)
    }

    let newTitleButtonClicked = () => {
        let titlesCount = titlesVisible + 1
        titlesVisibleSet(titlesCount)
        initTitlesCountSet(titlesCount)
        let titleDivs = Array.from(document.querySelectorAll(".newTitle"))
        titleDivs.map((tDiv: any, i: number) => {
            if (tDiv.id < titlesCount.toString()) {
                tDiv.className = "newTitle"
            } else {
                tDiv.className = "newTitle invisible"
            }
        })
        if (titlesCount >= 5){
            let buttonDiv = document.querySelector(".newTitleButton")
            if (buttonDiv != null) {
                buttonDiv.className += " invisible"
            }
        }
        console.log(titlesVisible)
    }

    let imageInputChanged = (link: string, i: number) => {
        let newArr = [...currentImgArr]
        newArr[i] = link
        currentImgArrSet(newArr)
    }

    let titleChanged = (i: number) => {
        
        let prev = index
        let newArr = [...imgArr]
        newArr[prev] = currentImgArr
        imgArrSet(newArr)
        if (i != index) {
            if (imgArr[i].length > 0) {
                currentImgArrSet(imgArr[i])
            } else {
                currentImgArrSet(["","",""])
            }
    }
        indexSet(i)
    }

    // let saveButtonClicked = () => {
    //     for (let i = 0; i < 5; i++) {
    //         if 
    //     }
    // }

    useEffect(() => {
        console.log(loaded, props.screenIndex)
        if (loaded != props.screenIndex) {
            clearInputs()
            resetAddedInputs()
            console.log("got info: ",props.infos);
            
            let titlesArr = ["","","","",""]
            let textsArr = ["","","","",""]
            let linksArr = [[],[],[],[],[]]
            let ciArr = ["","",""]
            initTitlesCountSet(1)
            let count = 0
            if (props.infos?.titles.length > 0) {
                for (let i = 0; i < props.infos?.titles.length; i++) {
                    titlesArr[i] = props.infos?.titles[i]
                    textsArr[i]= props.infos?.texts[i]
                    linksArr[i] = props.infos?.imgs[i]
                    if (props.infos?.titles[i] != '') {
                        count++
                    }
                }
                linksArr[0].map((link: any, i: number) => {
                    ciArr[i] = link
                })
                console.log("count:", count);
                initTitlesCountSet(count)
                
            }
            titlesSet(titlesArr)
            textArrSet(textsArr)
            imgArrSet(linksArr)
            currentImgArrSet(ciArr)
            indexSet(0)
            console.log("fetch ", textArr)
            loadedSet(props.screenIndex)
        }
    })

  return (
    <div className='NewScreenPage'>
        <div className="newTitlesBlock">
            <div className="newTitleText">Заголовки:</div>
            {titles.map((title: any, i: number) => {
                let idStr = i.toString()
                console.log("init ", initTitlesCount)
                let cname = i < initTitlesCount ? "newTitle" : "newTitle invisible"
                console.log(cname, " ", i, " ", title)
                console.log("data: ", textArr)
                return(
                    <div className={cname} id={idStr} key={i}>
                <input className="newTitleInput" type="text" maxLength={30} value={titles[i]}
                    onChange={e => addTitle(e.target.value, i)} 
                    onClick={e => titleChanged(i)}/>
            </div>
                )
            })}
            {
                initTitlesCount < 5 &&
            <button className='newTitleButton' onClick={newTitleButtonClicked}>ДОБАВИТЬ ЗАГОЛОВОК</button>
            }
            {/* <div className="newTitle" id="0">
                <input className="newTitleInput" type="text" maxLength={30} value={titles[0]}
                    onChange={e => addTitle(e.target.value, 0)} 
                    onClick={e => indexSet(0)}/>
            </div>
            <div className="newTitle" id="1">
                <input className="newTitleInput" type="text" maxLength={30} value={titles[1]}
                    onChange={e => addTitle(e.target.value, 1)} 
                    onClick={e => indexSet(1)}/>
            </div>
            <div className="newTitle" id="2">
                <input className="newTitleInput" type="text" maxLength={30} value={titles[2]}
                    onChange={e => addTitle(e.target.value, 2)} 
                    onClick={e => indexSet(2)}/>
            </div>
            <div className="newTitle" id="3">
                <input className="newTitleInput" type="text" maxLength={30} value={titles[3]}
                    onChange={e => addTitle(e.target.value, 3)} 
                    onClick={e => indexSet(3)}/>
            </div>
            <div className="newTitle" id="4">
                <input className="newTitleInput" type="text" maxLength={30} value={titles[4]}
                    onChange={e => changeText(e.target.value, index)} 
                    onClick={e => indexSet(4)}/>
            </div> */}
        </div>

        <div className="newTextBlock">
            <div className="newTextTitle">Текст:</div>
            <div className="newText">
            {/* <input className="newTextInput" type="text" maxLength={2000} value={textArr[index]}
                    onChange={e => changeText(e.target.value, index)} /> */}
                <textarea className="newTextInput" maxLength={2000} autoCorrect="on"
                    rows={20} cols={100} value={textArr[index]} readOnly={false}
                    onChange={e => changeText(e.target.value, index)}
                    ref={refText} />
            </div>
        </div>

        <div className="newImagesBlock">
            <div className="newImagestTitle">Ссылка на изображение:</div>
            <div className="newImage">
            {/* <input className="newTextInput" type="text" maxLength={2000} value={textArr[index]}
                    onChange={e => changeText(e.target.value, index)} /> */}
                <input className="newImageInput" id="0" maxLength={200}
                    value={currentImgArr[0]} type="text"
                    onChange={e => imageInputChanged(e.target.value, 0)}/>
                    <input className="newImageInput" id="1" maxLength={200}
                    value={currentImgArr[1]} type="text"
                    onChange={e => imageInputChanged(e.target.value, 1)}/>
                    <input className="newImageInput" id="2" maxLength={200}
                    value={currentImgArr[2]} type="text"
                    onChange={e => imageInputChanged(e.target.value, 2)}/>
            </div>
            
        </div>

        <div className="saveButtonBlock">
        <button className='saveButton' onClick={handleSaveButtonClicked}>СОХРАНИТЬ</button>
        </div>
    </div>
  )
}

export default NewScreen