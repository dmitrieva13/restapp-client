import { useState, useEffect, useRef } from 'react'
import './style/App.css'
import TopHolder from './TopHolderRest'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage'
import Poster from './Poster';
import Booking from './Booking';
import InfoScreen from './InfoScreen';


function RestaurantPage() {

  let { restaurantId } = useParams();


  let infoArr = {
    mainImgs: ["first"],
    mainInfo: {
      name: "Le Resto"
    },
    bookingImgs: ["first booking"],
    screens: [
      {
        info: [
          {
            title: "Title one",
            text: 'Some basic description one\
            arry lay flat on his back, breathing hard as though he had\
been running. He had awoken from a vivid dream with\
his hands pressed over his face. The old scar on his forehead, which\
was shaped like a bolt of lightning, was burning beneath his fingers\
as though someone had just pressed a white-hot wire to his skin.\
He sat up, one hand still on his scar, the other reaching out in\
the darkness for his glasses, which were on the bedside table. He\
put them on and his bedroom came into clearer focus, lit by a faint,\
misty orange light that was filtering through the curtains from the\
street lamp outside the window.\
Harry ran his fingers over the scar again. It was still painful. He\
turned on the lamp beside him, scrambled out of bed, crossed the\
room, opened his wardrobe, and peered into the mirror on the inside of the door. A skinny boy of fourteen looked back at him, his\
bright green eyes puzzled under his untidy black hair. He examined\
H\
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce blandit molestie lobortis. Phasellus ut vehicula ipsum, porttitor egestas mauris. In quis dui quis nisi pellentesque congue. In in volutpat diam. Donec porttitor convallis ipsum finibus varius. Cras porttitor pulvinar est, at sodales felis facilisis tristique. Curabitur gravida auctor ligula, eget rhoncus mauris vulputate sit amet.\
Aliquam fringilla luctus pretium. Aliquam nec urna arcu. Donec nec commodo turpis. Vestibulum non posuere elit, et hendrerit libero. Vestibulum ac ante tempor, consequat enim vel, tincidunt dolor. Nullam at leo vulputate, euismod lacus vel, lacinia dui. Integer at feugiat nunc, eu consequat justo.\
Suspendisse potenti. Ut semper mauris id urna imperdiet, at aliquam erat egestas. Aliquam ante dui, molestie ut purus at, eleifend aliquam neque. Duis a ligula lobortis, lobortis eros ut, vulputate dolor. Duis vestibulum cursus dolor a tempor. Aenean rhoncus quam nibh, vulputate iaculis eros lobortis eget. Praesent quis consectetur orci. Vestibulum et diam ut ipsum iaculis dictum.\
In consequat, quam in suscipit maximus, diam elit dictum nisl, et elementum augue ligula sit amet risus. Curabitur tristique risus sed nulla laoreet mattis. Nunc suscipit viverra laoreet. Fusce maximus risus non pulvinar blandit. Donec vel tortor et arcu facilisis varius facilisis a nunc. Mauris euismod erat tortor, fringilla efficitur lectus pretium at. Pellentesque auctor maximus dui, at tincidunt ex dapibus vitae. Nulla in facilisis orci, vel tristique magna. Nullam vestibulum ligula odio, ac auctor nisl condimentum non. Nulla leo magna, cursus vel mauris vitae, pharetra vestibulum massa. Vestibulum tempor eros id hendrerit placerat. Suspendisse vestibulum erat eget mauris vehicula congue. Fusce facilisis, massa nec facilisis elementum, mauris justo blandit quam, in sodales purus orci sit amet nulla. Vivamus pretium consectetur mauris ac tempor. Donec quis quam mollis, convallis lacus eu, pellentesque libero. Maecenas at nisi nec arcu aliquet pulvinar.\
Nam eget metus sed est tincidunt tincidunt eu eget purus. Etiam massa tortor, vehicula eu arcu vitae, ornare vestibulum eros. Nam lacinia augue ex, et iaculis lectus volutpat ut. Etiam varius finibus nisl. Quisque ac felis mattis, tincidunt metus et, vehicula purus. Sed eu suscipit sem. Nullam quis justo id enim molestie dignissim. Mauris hendrerit vehicula pharetra. Curabitur tempor mattis porttitor. Vestibulum quis sagittis ligula, vitae consectetur ipsum. Nullam accumsan tellus id orci malesuada fringilla consequat nec metus. Donec mollis ante ac ex gravida volutpat at et velit. Vivamus vel ex augue. Quisque in odio vel nisl scelerisque efficitur eu sed massa. Curabitur tincidunt lacus eget placerat laoreet.',
            images: ["first img 1-1"]
          },
          {
            title: "Title two",
            text: "Some basic description two",
            images: ["first img 1-2", "second img 1-2"]
          },
        ],
        // images: ["first img", "second img"]
      },
      {
        info: [
          {
            title: "Title TWOONE",
            text: "Some basic TWOONE description",
            images: ["first SECOND img"]
          }
        ],
        // images: ["first SECOND img"]
      },
      {
        info: [
          {
            title: "Title one",
            text: "Some basic description one",
            images: ["first img 222", "second img 222"]
          },
          {
            title: "Title two",
            text: "Some basic description two",
            images: ["first img 3", "second img 3", "333"]
          },
        ],
        // images: ["first img", "second img"]
      }
    ]
  }


  const [fetched, fetchedSet] = useState(0)
  const [addess, addessSet] = useState("")
  const [restaurantName, restaurantNameSet] = useState("")
  const [mainScreen, mainScreenSet] = useState<any>(null)
  const [screensArr, screensArrSet] = useState<any[]>([])
  // const [workingHours, workingHoursSet] = useState([])
  // const [contacts, contactsSet] = useState("")
  // const [descripton, descriptonSet] = useState("")

  const [screen, screenSet] = useState(0)
  const [index, indexSet] = useState(0)
  const [imageNum, imageNumSet] = useState(0)
  const [screenCount, screenCountSet] = useState(0)

  const [loading, loadingSet] = useState(false)

  // const [guestName, guestNameSet] = useState("")
  // const [guestSurname, guestSurnameSet] = useState("")
  // const [bookedDate, bookedDateSet] = useState("")
  // const [bookedTime, bookedTimeSet] = useState("")
  // const [guestsNum, guestsNumSet] = useState("")
  // const [bookedComment, bookedCommntSet] = useState("")

  const [todaysDate, todaysDateSet] = useState("")
  const [isMainScreen, isMainScreenSet] = useState(0)

  const [imageId, imageIdSet] = useState(0)


  let underlineTitle = (targetId: string) => {
    let titleDivs = Array.from(document.querySelectorAll(".title"))
    titleDivs.map((title: any, i: number) => {
      if (title.id == targetId) {
        title.className = "title selected"
      } else {
          title.className = "title"
        }
      }
    )
  }

  let setActiveDots = (i: string) => {
    console.log("from rest");
    
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

  // let loading = false;
      // let screenNumber = 0;
      let scrolling = (e: any) => {
        console.log("target: " + screen)
        if (e.target.className === 'textBlock' && 
            e.target.scrollHeight > e.target.offsetHeight && 
            ((e.target.scrollTop > 0 && e.deltaY < 0) ||
              (e.target.scrollHeight - e.target.scrollTop - 
              e.target.clientHeight > 1 && e.deltaY > 0))) {
          return
        }
        if (!loading) {
          let screenNumber = screen
          console.log(screenNumber)
          if (e.deltaY > 0) {
            // scrolling down
            if (screenNumber < screenCount) {
              // console.log(screenNumber)
              ++screenNumber;
              let dotsClass = document.querySelector(".welcomeDots")
              if (dotsClass != null) {
                dotsClass.className += " invisible"
              }
              // screenSet(screen + 1)
            }
          } else {
            // scrolling up
            if (screenNumber != 0) {
              // screenSet(screen-1)
              --screenNumber;
              if (screenNumber == 0) {
                let dotsClass = document.querySelector(".welcomeDots")
                  if (dotsClass != null) {
                    dotsClass.className = "welcomeDots dots"
                  }
              }
            }
          }
          // screenSet(screenNumber)
          // indexSet(0)
          // imageNumSet(0)
          // setTimeout(function(){
          //   // console.log(scrolling)
          //   indexSet(0)
          //   imageNumSet(0)
          // }, 1000)

          indexSet(0)
          setTimeout(function(){
            // console.log(scrolling
            // imageNumSet(0)
            imageIdSet(0)
            setActiveDots('0')
          }, 1000)

          loadingSet(true)
          screenSet(screenNumber)
          setTimeout(function(){
            // console.log(scrolling)
            loadingSet(false)
          }, 1000)

          let idStr = (screenNumber - isMainScreen - 1) + ".0"
          underlineTitle(idStr)
        }
      }

  useEffect(() => {
    if(!fetched) {
      // fetchedSet(1)
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

        fetchedSet(1)
        restaurantNameSet(response.name)
        // mainScreenSet(response.screens.filtering)
        response.screens.map((scr: any) => {
          if (scr.type == "main") {
            mainScreenSet(scr)
            isMainScreenSet(1)
          }
        })
        console.log("FIRING")

        screensArrSet(response.screens)
        screenCountSet(response.screens.length)
        // response.screens.map((screen: any) => {
        //   if (screen.type == "description") {
        //     screensArr.push(screen)
        //   }
        // })
        // console.log(screensArr)

        console.log(response)
        // addessSet(response.restaurant.address)
        // contactsSet(response.restaurant.contacts)
        // descriptonSet(response.restaurant.description)

        // let wh = response.restaurant.working_hours
        // workingHoursSet(wh.split("\n"))
      })
      .catch(error=>{console.log(error)})

      let date = new Date()
      let day = date.getDate() >= 10 ? date.getDate().toString() : "0" + date.getDate()
      let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1).toString() : "0"+(date.getMonth() + 1);
      let year = date.getFullYear();
      let dateStr = `${year}-${month}-${day}`
      todaysDateSet(dateStr)
      console.log(todaysDate)

      // let loading = false;
      // let screenNumber = 0;
      // let scroll = (e: any) => {
      //   console.log("target: " + e.target)
      //   if (e.target.className == 'textBlock' && 
      //       e.target.scrollHeight > e.target.offsetHeight && 
      //       ((e.target.scrollTop > 0 && e.deltaY < 0) ||
      //         (e.target.scrollHeight - e.target.scrollTop - 
      //         e.target.clientHeight > 1 && e.deltaY > 0))) {
      //     return
      //   }
      //   if (!loading) {
      //     console.log("in scroll")
      //     if (e.deltaY > 0) {
      //       // scrolling down
      //       if (screenNumber < 4) {
      //         // console.log(screenNumber)
      //         ++screenNumber;
      //       }
      //     } else {
      //       // scrolling up
      //       if (screenNumber != 0) {
      //         --screenNumber;
      //       }
      //     }
      //     screenSet(screenNumber)
      //     // indexSet(0)
      //     // imageNumSet(0)
      //     // setTimeout(function(){
      //     //   // console.log(scrolling)
      //     //   indexSet(0)
      //     //   imageNumSet(0)
      //     // }, 1000)

      //     setTimeout(function(){
      //       // console.log(scrolling)
      //       indexSet(0)
      //       imageNumSet(0)
      //       setActiveDots('0')
      //     }, 1000)

      //     loading = true
      //     setTimeout(function(){
      //       // console.log(scrolling)
      //       loading = false
      //     }, 1000)
      //   }
      // }
      // document.querySelector(".App")?.addEventListener('wheel', scroll)
      // console.log(document.querySelector(".App"))

      // ).catch(error=>{console.log(error)})
      // let textIndexChange = (e: any) => {
      //   let id = e.target.id
      //   let indexes = id.split(".")
      //   setTimeout(function(){
      //     // console.log(scrolling)
      //     indexSet(indexes.at(1))
      //   }, 200)
      //   //indexSet(indexes.at(1))
      //   console.log("index ", index)
      //   console.log("screen:", screen)
      //   console.log("img: ", imageNum)
      // }
      // let titles = document.querySelectorAll(".title")
      // titles.forEach(t => t.addEventListener('click', textIndexChange))
    }

    // function wheelHandler(e) {
    //   document.removeEventListener('wheel', wheelHandler)
    //   e.stopPropagation();
    //   e.preventDefault();
    //   console.log("GO")
    //   let a = document.querySelector(".welcomeImages").style.marginTop = "-300px"
    //   scrollingSet(1)
    //   console.log("after scroll: ", scrolling)
    //   setTimeout(function(){
    //     document.addEventListener('wheel', wheelHandler)
    //     scrollingSet(0)
    //   }, 3000)
    // }
    
  });

  // useEffect(() => {
  //     setTimeout(function(){
  //       console.log("back")
  //       scrollingSet(0)
  //     }, 1000)
  // }, [scrolling]);
  
  let img_links: string[] = [
    'https://media-cdn.tripadvisor.com/media/photo-s/1d/22/dc/0a/pizzeria-le-basilic.jpg',
    'https://media-cdn.tripadvisor.com/media/photo-s/21/6a/86/4d/caption.jpg'
  ]

  let textIndexChange = (e: any) => {
    let id = e.target.id
    let indexes = id.split(".")
    // imageNumSet(0)
    imageIdSet(0)
    setTimeout(function(){
      // console.log(scrolling)
      console.log(id);
      
      indexSet(indexes.at(1))
      setActiveDots('0')
    }, 200)
    underlineTitle(id)
    //indexSet(indexes.at(1))
    // console.log(infoArr)
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

  // let setError = (inputName: string) => {
  //   let input = document.querySelector("."+inputName)
  //   // console.log(input)
  //   if (input != null) {
  //     input.className += " invalid"
  //     input.addEventListener("click", e => {
  //       let found = document.querySelector("."+inputName)
  //       if (found != null) {
  //         found.className = inputName
  //       }
  //     })
  //   }
  // }

  // let makeVisisble = (className: string) => {
  //   let divClass = document.querySelector("." + className)
  //   if (divClass != null) {
  //     divClass.className = className
  //   }
  // }

  // let makeInvisisble = (className: string) => {
  //   let divClass = document.querySelector("." + className)
  //   if (divClass != null) {
  //     divClass.className += " invisible"
  //   }
  // }

  // let sendBooking = () => {
  //   let success = true
  //   let bookingJSON = {
  //     "name": guestName,
  //     "surname": guestSurname,
  //     "date": bookedDate,
  //     "time": bookedTime,
  //     "guestsNum": guestsNum,
  //     "comment": bookedComment
  //   }
  //   if (bookingJSON.name.length < 1) {
  //     success = false
  //     setError("nameInput")
  //   }
  //   if (bookingJSON.surname.length < 1) {
  //     success = false
  //     setError("surnameInput")
  //   }
  //   if (bookingJSON.date.length < 1) {
  //     success = false
  //     setError("dateInput")
  //   }
  //   if (bookingJSON.time.length < 1) {
  //     success = false
  //     setError("timeInput")
  //   }
  //   if (bookingJSON.guestsNum.length < 1) {
  //     success = false
  //     setError("guestsInput")
  //   }
  //   if (!success) {
  //     return
  //   }
  //   makeInvisisble("bookingFormBlock")
  //   makeVisisble("bookingSuccessBlock")
  //   setTimeout(function(){
  //     makeVisisble("bookingFormBlock")
  //     makeInvisisble("bookingSuccessBlock")
  //   }, 2000)
  //   guestNameSet("")
  //   guestSurnameSet("")
  //   bookedDateSet("")
  //   bookedTimeSet("")
  //   guestsNumSet("")
  //   bookedCommntSet("")
  // }

  if(fetched){
  return (
    <div className='App' onWheel={scrolling}>
      {mainScreen != null &&
      <Poster imgArr={mainScreen.info.at(0).images} screen={screen} />
      
  }
      <TopHolder name={restaurantName} user={localStorage.getItem("username") || ""} />

      <Booking />
      

      {screensArr != null &&
      screensArr.map((inform, indexScreen) => {
        if (inform.type != "main") {
        console.log("screen: ", inform.info.at(index), "i: ", index)
        return(
          <InfoScreen inform={inform} isMain={isMainScreen} index={index} 
          indexScreen={indexScreen} screen={screen} textIndexChange={textIndexChange} 
          imageID={imageId} imageIDSet={imageIdSet}/>
   
    )}})}

    </div>
  )
  } else {
    return(
      <LoadingPage />
    )
  }
}

export default RestaurantPage
