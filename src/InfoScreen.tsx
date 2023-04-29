import { useState } from 'react'
import './style/App.css'

function InfoScreen(props: {inform: any, isMain: any, index: number, 
indexScreen: number, screen: number, textIndexChange: any}) {
    const [imageNum, imageNumSet] = useState(0)

    // let underlineTitle = (targetId: string) => {
    //     let titleDivs = Array.from(document.querySelectorAll(".title"))
    //     titleDivs.map((title: any, i: number) => {
    //       if (title.id == targetId) {
    //         title.className = "title selected"
    //       } else {
    //           title.className = "title"
    //         }
    //       }
    //     )
    //   }

    let setActiveDots = (i: string) => {
        let dots = document.querySelectorAll(".dot")
        dots.forEach(d => {
          let dotID = d.id
          if (dotID === i) {
            d.className = "dot active"
          } else {
            d.className = "dot"
          }
        })
      }

    let imageIndexChange = (e: any) => {
        let id = e.target.id
        setActiveDots(id)
        // let dots = document.querySelectorAll(".dot")
        // dots.forEach(d => {
        //   let dotID = d.id
        //   if (dotID === id) {
        //     d.className += " active"
        //   } else {
        //     d.className = "dot"
        //   }
        // })
        setTimeout(function(){
          // console.log(scrolling)
          imageNumSet(id)
        }, 200)
      }

      

  return (
    <div className="screen" key={props.indexScreen}>
        <div className="textInfo">
          <div className="titlesBlock">
          {props.inform.info.map((screenInfo: any, i: number) => {
            // {infoArr.screens.at(indexScreen)?.info.map((titles, index) => {
              let idStr = (props.indexScreen - props.isMain) + "." + i
              let cname = i == 0 ? "title selected" : "title" 
              return(
                <div id={idStr} className={cname} key={i} onClick={props.textIndexChange}>
                  {screenInfo.title}
                </div>
              )
            })}
            {/* <div id="0.0" className="title">
              {infoArr.screens.at(0)?.info.at(0)?.title}
            </div>
            <div id="0.1" className="title">
              {infoArr.screens.at(0)?.info.at(1)?.title}
            </div> */}
          </div>
          <div className="textBlock">
            {props.inform.info.at(props.index)?.text}
          </div>
        </div>
        <div className="imagesBlock">
          <div className="image">
            {(props.indexScreen + 1 == props.screen) &&
              <img src={props.inform.info.at(props.index).images?.at(imageNum)} loading="eager"/>
            }
          </div>
          <div className="dots">
            {(props.indexScreen + 1 == props.screen) &&
            props.inform.info.at(props.index).images?.map((image: any, i: number) => {
              // console.log("l ",infoArr.screens.at(screen - 1)?.info.at(index)?.images.length || 0)
              //if (inform.images) {
                if ((props.inform.info.at(props.index).images?.length || 0) < 2)
                return
              //}
              let idStr = i.toString()
              console.log(imageNum)
              return(
                <div id={idStr} className={i === 0 ? "dot active" : "dot"} 
                key={i} onClick={imageIndexChange}> </div>
              )
            })}
          </div>
      
        </div>
      </div>
  )
}

export default InfoScreen