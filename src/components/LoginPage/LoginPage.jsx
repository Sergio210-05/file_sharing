import React, { useState, useEffect } from "react";
import axios from 'axios';
import { csrfURL, loginURL, logoutURL, sessionURL, userInfoURL, removeSessionsURL, registrationURL } from "../../URLs/urls";
import { LinkItem } from "../Buttons/AuthButton/AuthButton";

// import style from './index.module.scss';



// const serverURL = 'http://localhost:8000/'

export const LoginPage = ({serverURL}) => {
  const [isCsrf, setIsCsrf] = useState(null)
  const [isLogin, setIsLogin] = useState('')
  const [isPassword, setIsPassword] = useState('')
  const [isError, setIsError] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
      getSession()
  }, [])

  const isResponseOk = (res) => {
    if (!(res.status >= 200 && res.status <= 299)) {
      throw Error(res.statusText);
    }
  }

  const getCSRF = () => {
    axios.get(serverURL + csrfURL, { withCredentials: true })
    .then((res) => {
        isResponseOk(res)

        const csrfToken = res.headers.get('X-CSRFToken')
        setIsCsrf(csrfToken)
    })
    .catch((err) => console.error(err))
}

  const getSession = () => {
    axios.get(serverURL + sessionURL, { withCredentials: true })
    .then((res) => {
        if (res.data.isAuthenticated) {
            setUserId(res.data.user_id)
            setUsername(res.data.username)
            setIsAuth(true)
            return
        }

        setIsAuth(false)
        getCSRF()
    })
    .catch((err) => {
      console.error(err)
      console.log(err.response.data.detail);
    })
  }

  const login = () => {
    console.log(serverURL + loginURL)
    console.log(isLogin)
    console.log(isPassword)
    const data = { username: isLogin, password: isPassword }
    axios.post(serverURL + loginURL, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": isCsrf,
      }
    })
    .then((res) => {
      isResponseOk(res)
      setIsAuth(true)
      setIsLogin('')
      setIsPassword('')
      setIsError(null)
      
      userInfo()
    })
    .catch((err) => {
      console.error(err);
      console.log(err.response.data.detail);
      setIsError("Неверные данные")
    });
  }

  const logout = () => {
    axios.get(serverURL + logoutURL, { withCredentials: true })
    .then((res) => {
      isResponseOk(res)
      setIsAuth(false);
      getCSRF();
    })
    .catch((err) => {
      console.error(err)
      console.log(err.response.data.detail);
    })
  }

  const userInfo = () => {
    axios.get(serverURL + userInfoURL, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("Вы авторизованы как: " + res.data.username);
      setUsername(res.data.username)
    })
    .catch((err) => {
        if (err.status === 401) {
          console.log(err.error)
          console.log(err.response.data.detail)
        };
    });
  }

  const killAllSessions = () => {
    axios.get(serverURL + removeSessionsURL, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      isResponseOk(res)
      console.log(res.data.detail)
    })
    .catch((err) => {
      console.error(err)
      console.log(err.response.data.detail);
    })
  }

  function changePassword(e) {
      setIsPassword(e.target.value)
  }

  function changeLogin(e) {
      setIsLogin(e.target.value)
      // console.log(isLogin)
  }

  function submitForm(e) {
      e.preventDefault()
      login()
  }


  return(
    <div className=''>
        <div className=''>
          Вы - 
          <span className=''>
          {
            isAuth ? ' ' + username   : ' неавторизованы' 
          }
          </span>
        </div>

        {
          !isAuth ?
            <form className=''>
                <label htmlFor="login">Логин</label>
                <input 
                    type="text" 
                    name="login" 
                    id="login" 
                    className=''
                    onChange={changeLogin}
                    value={isLogin}
                />

                <label htmlFor="password">Пароль</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    className=''
                    onChange={changePassword}
                    value={isPassword}
                />

                {
                    isError ? <div className='{style.error}'>{isError}</div> : null
                }

                <input type="submit" value='Войти' onClick={submitForm} className='' />
            </form>
          :

            <div className=''>
             <LinkItem title="Выход" link="/logout"/>
            </div>
                
        }
        
    </div>
  )
}

