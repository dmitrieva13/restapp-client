import { useState } from 'react'
import './style/PhotoCarousel.css'

function Carousel(props: {imgArr: string[], index: number}) {

  return (
    <div className="imagesBlock">
          {/* <div className="image">
            {props.imgArr.at(props.index)}
          </div>
          <div className="dots">
            {props.imgArr.map((image, i) => {
              // console.log("l ",infoArr.screens.at(screen - 1)?.info.at(index)?.images.length || 0)
              if (props.imgArr) {
                if ((props.imgArr.length || 0) < 2)
                return
              }
              let idStr = i.toString()
              console.log(idStr)
              return(
                <div id={idStr} className={i === 0 ? "dot active" : "dot"} 
                key={i} onClick={imageIndexChange}> </div>
              )
            })}
          </div> */}
        </div>
  )
}

export default Carousel
