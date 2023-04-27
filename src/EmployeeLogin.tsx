import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import './style/Login.css'


function EmployeeLogin() {
    const navigate = useNavigate()
    const [username, usernameSet] = useState("")
    const [password, passwordSet] = useState("")
    const [error, errorSet] = useState("")


    let goToUserLogin = () => {
        navigate("/login")
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
        fetch("https://restapp.onrender.com/employee_login", {
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
            console.log(response)
            if(!response?.user){
                console.log("CASA BONITA")
                errorSet(response.message)
                setError("employeeUsernameInput")
                setError("employeePasswordInput")
                makeVisisble("loginError")
            } else {
                let decode : {restaurant_id: string, role: string, email: string} 
                    = jwt_decode(response.user.accessToken)
                console.log(decode)
                localStorage.setItem("accessToken", response.user.accessToken)
                localStorage.setItem("refreshToken", response.user.refreshToken)
                localStorage.setItem("restaurant", decode.restaurant_id)
                localStorage.setItem("role", decode.role)
                localStorage.setItem("username", decode.email)
                // window.location.replace("/")
            }
          })
          .catch(er=>{
            console.log(er.message)
        })
    }

    return(
        <div className="EmployeeLoginPage">
            <div className="loginTitle">
                ВОЙТИ В РАБОЧИЙ АККАУНТ
            </div>
            <div className="EmployeeInputsBlock">
                <div className="EmployeeEmaiInputBlock">
                    <div className="employeeLoginTextBlock">
                        Email:
                    </div>
                    <input className="employeeUsernameInput" maxLength={200}
                        value={username} type="text"
                        onChange={e => {
                            usernameSet(e.target.value)
                            errorSet("")
                            }}/>
                </div>
                <div className="EmployeePasswordInputBlock">
                    <div className="employeeLoginTextBlock">
                    Пароль:
                    </div>
                    <input className="employeePasswordInput" maxLength={200}
                        value={password} type="text"
                        onChange={e => {
                            passwordSet(e.target.value)
                            errorSet("")
                            }}/>
                </div>
                {/* {error ? <div>Error<div> : <div></div>} */}
                <div className='loginError'>{error}</div>
                
            </div>
            <div className="employeeButtonBlock">
                <button className='loginButton' onClick={login}>ВОЙТИ</button>
            </div>
            <div className="toUserBlock">
                <button className='toUserButton' onClick={goToUserLogin}>ВОЙТИ КАК ПОЛЬЗОВАТЕЛЬ</button>
            </div>
            
        </div>
    )
}

export default EmployeeLogin