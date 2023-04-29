import { useState, useEffect } from 'react'
import './style/App.css'

function Booking() {
  const [guestName, guestNameSet] = useState("")
  const [guestSurname, guestSurnameSet] = useState("")
  const [bookedDate, bookedDateSet] = useState("")
  const [bookedTime, bookedTimeSet] = useState("")
  const [guestsNum, guestsNumSet] = useState("")
  const [bookedComment, bookedCommntSet] = useState("")

  const [todaysDate, todaysDateSet] = useState("")

  let setError = (inputName: string) => {
    let input = document.querySelector("."+inputName)
    // console.log(input)
    if (input != null) {
      input.className += " invalid"
      input.addEventListener("click", e => {
        let found = document.querySelector("."+inputName)
        if (found != null) {
          found.className = inputName
        }
      })
    }
  }

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

  let sendBooking = () => {
    let success = true
    let bookingJSON = {
      "name": guestName,
      "surname": guestSurname,
      "date": bookedDate,
      "time": bookedTime,
      "guestsNum": guestsNum,
      "comment": bookedComment
    }
    if (bookingJSON.name.length < 1) {
      success = false
      setError("nameInput")
    }
    if (bookingJSON.surname.length < 1) {
      success = false
      setError("surnameInput")
    }
    if (bookingJSON.date.length < 1) {
      success = false
      setError("dateInput")
    }
    if (bookingJSON.time.length < 1) {
      success = false
      setError("timeInput")
    }
    if (bookingJSON.guestsNum.length < 1) {
      success = false
      setError("guestsInput")
    }
    if (!success) {
      return
    }
    makeInvisisble("bookingFormBlock")
    makeVisisble("bookingSuccessBlock")
    setTimeout(function(){
      makeVisisble("bookingFormBlock")
      makeInvisisble("bookingSuccessBlock")
    }, 2000)
    guestNameSet("")
    guestSurnameSet("")
    bookedDateSet("")
    bookedTimeSet("")
    guestsNumSet("")
    bookedCommntSet("")
  }

  useEffect(() => {
      let date = new Date()
      let day = date.getDate() >= 10 ? date.getDate().toString() : "0" + date.getDate()
      let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1).toString() : "0"+(date.getMonth() + 1);
      let year = date.getFullYear();
      let dateStr = `${year}-${month}-${day}`
      todaysDateSet(dateStr)
  })

  return (
    <div className="screen">
        <div className="textInfo">
          <div className="titlesBlock">
            <div className="title" style={{cursor: 'default'}}>Бронирование</div>
          </div>
          <div className="bookingSuccessBlock invisible">
            <div className="successText">
              Ваше бронирование отправлено в ресторан!
            </div>
          </div>
          <div className="bookingFormBlock">
            <div className="namesBlock">
              <div className="nameBlock">
                <input className="nameInput" type="text" maxLength={50} value={guestName} 
                onChange={e => guestNameSet(e.target.value)}></input>
                <div className="inputText">Имя</div>
              </div>
              <div className="surnameBlock">
                <input className="surnameInput" type="text" maxLength={50} value={guestSurname} 
                onChange={e => guestSurnameSet(e.target.value)}></input>
                <div className="inputText">Фамилия</div>
              </div>
            </div>
            <div className="timesBlock">
              <div className="datetimeBlock">
                <input className="dateInput" type="date" value={bookedDate} min={todaysDate}
                onChange={e => bookedDateSet(e.target.value)}></input>
                <input className="timeInput" type="time" value={bookedTime} 
                onChange={e => bookedTimeSet(e.target.value)}></input>
              </div>
              <div className="inputText">Дата и время</div>
            </div>
            <div className="guestsBlock">
              <input className="guestsInput" type="text" value={guestsNum} onChange={event => {
                guestsNumSet(event.target.value.replace(/[^0-9]/,''))
                }}/>
              <div className="inputText">Количество гостей</div>
            </div>
            <div className="commentBlock">
              <input type="text" maxLength={100} value={bookedComment} 
                onChange={e => bookedCommntSet(e.target.value)}></input>
              <div className="inputText">Комментарий к брони</div>
            </div>
            <div className="booking">
            <div className="bookingButton" onClick={sendBooking}>ЗАБРОНИРОВАТЬ</div></div>
          </div>
        </div>
    </div>
  )
}

export default Booking