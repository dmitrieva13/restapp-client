import { useState } from 'react'
import './style/PhotoCarousel.css'

function Carousel(props: {links: string[]}) {

  const [index, setIndex] = useState(0);
  const length = props.links.length

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };

  return (
    <div className='Carousel'>
      <button className='carouselButton' onClick={handlePrevious}>
        <img src='./images/prev.png' style={{width: "20px"}}></img>
      </button>
      <div className='currentImage'>
        <img src={props.links.at(index)} 
        style={{height: '300px', maxWidth: '500px'}}></img>
      </div>
      <button className='carouselButton' onClick={handleNext}>
      <img src='./images/next.png' style={{width: "20px"}}></img>
      </button>
    </div>
  )
}

export default Carousel
