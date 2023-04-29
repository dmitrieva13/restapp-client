import { useState } from 'react'
import './style/App.css'

function Poster(props: {imgArr: any[], screen: number}) {
    const [imageNum, imageNumSet] = useState(0)

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
    <div className="welcomeImages" style={{marginTop: `-${100*props.screen}vh`}}>
      {/* <div className="imagesBlock"> */}
          <div className="image">
              <img className="welcomeImg" src={props.imgArr.at(imageNum)} loading="eager"/>
          </div>
          <div className="welcomeDots dots">
            {props.imgArr.map((image: any, i: number) => {
              // console.log("l ",infoArr.screens.at(screen - 1)?.info.at(index)?.images.length || 0)
              //if (inform.images) {
                if ((props.imgArr.length || 0) < 2)
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
      
        {/* </div> */}
      </div>
  )
}

export default Poster
