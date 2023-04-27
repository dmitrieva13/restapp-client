import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import './style/Login.css'


function Login() {
    const [username, usernameSet] = useState("")
    const [password, passwordSet] = useState("")
    const [error, errorSet] = useState("")

    const navigate = useNavigate()

    let goToElogin = () => {
        navigate("/elogin")
    }

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

    let login = () => {
        fetch("https://restapp.onrender.com/login", {
              method: "POST",
              body: JSON.stringify({
                    email: username,
                    password: password
                }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
          }
          ).then(res=>res.json())
          .then(response=>{
            console.log("AA")
            console.log(response)
            if(!response?.user){
                console.log("CASA BONITA")
                errorSet(response.message)
                setError("userUsernameInput")
                setError("userPasswordInput")
                makeVisisble("loginError")
                // setTimeout(function(){
                // makeInvisisble("loginError")
                // }, 10000)
            } else {
                let decode : {restaurant_id: string, role: string, email: string} 
                    = jwt_decode(response.user.accessToken)
                console.log(decode)
                localStorage.setItem("accessToken", response.user.accessToken)
                localStorage.setItem("refreshToken", response.user.refreshToken)
                localStorage.setItem("restaurant", decode.restaurant_id)
                localStorage.setItem("role", decode.role)
                localStorage.setItem("username", decode.email)
                window.location.replace("/")
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
    }

    return(
        <div className="userLoginPage">
            <div className="loginTitle">
                ВОЙТИ В АККАУНТ
            </div>
            <div className="userInputsBlock">
                <div className="userEmaiInputBlock">
                    <div className="userLoginTextBlock">
                        Email:
                    </div>
                    <input className="userUsernameInput" maxLength={200}
                        value={username} type="text"
                        onChange={e => {
                            usernameSet(e.target.value)
                            errorSet("")
                            }}/>
                </div>
                <div className="userPasswordInputBlock">
                    <div className="userLoginTextBlock">
                    Пароль:
                    </div>
                    <input className="userPasswordInput" maxLength={200}
                        value={password} type="text"
                        onChange={e => {
                            passwordSet(e.target.value)
                            errorSet("")
                            }}/>
                </div>
                {/* {error ? <div>Error<div> : <div></div>} */}
                <div className='loginError'>{error}</div>
                
            </div>
            <div className="userButtonBlock">
                <button className='loginButton' onClick={login}>ВОЙТИ</button>
                
            </div>
            {/* <h1 onClick={goToElogin}>войти как работник</h1> */}
            <div className="toEmployeeBlock">
                <button className='toEmployeeButton' onClick={goToElogin}>ВОЙТИ КАК РАБОТНИК</button>
            </div>
        </div>
    )
}

export default Login