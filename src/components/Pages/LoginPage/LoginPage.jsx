import './LoginPage.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { mainURL, csrfURL, loginURL, logoutURL, sessionURL, userInfoURL, removeSessionsURL, registrationURL } from "../../../URLs/urls";
import { LinkItem, LinkItemAction } from "../../Buttons/AuthButton/AuthButton";
import { useDispatch, useSelector } from 'react-redux';
import { succesAuth, succesLogout } from '../../../redux/slices';
import { stateSelector, isAuthSelector, userSelector, loginSelector, fullNameSelector, isAdminSelector } from '../../../redux/selectors';
import { changeLogin, changePassword, logout, isResponseOk } from "../../../utils";
import { useNavigate } from "react-router-dom";

// import style from './index.module.scss';



// const serverURL = 'http://localhost:8000/'
//, changeLogin, changePassword

export const LoginPage = ({serverURL, user}) => {
  const [isCsrf, setIsCsrf] = useState(null)
  const [isLogin, setIsLogin] = useState('')
  const [isPassword, setIsPassword] = useState('')
  const [isError, setIsError] = useState(null)
  // const [isAuth, setIsAuth] = useState(false)
  // const [username, setUsername] = useState('')
  // const [userId, setUserId] = useState(null)
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector)
  // console.log(isAuth)
  // const st = useSelector(userSelector)
  // console.log(st)
  

  useEffect(() => {
    getSession()
  }, [])
  // getSession()
  // const { id, userName, fullName, email, isAdmin } = useSelector(userSelector)
  const navigate = useNavigate()

  // const isResponseOk = (res) => {
  //   if (!(res.status >= 200 && res.status <= 299)) {
  //     throw Error(res.statusText);
  //   }
  // }

  const getCSRF = () => {
    axios.get(serverURL + csrfURL, { withCredentials: true })
    .then((res) => {
      console.log('Запрос токена')
      isResponseOk(res)
      const csrfToken = res.headers.get('X-CSRFToken')
      setIsCsrf(csrfToken)
    })
    .catch((err) => console.error(err))
  }

  const getSession = () => {
    axios.get(serverURL + sessionURL, { withCredentials: true })
    .then((res) => {
      console.log('Проверка сессии')
      if (res.data.isAuth) {
          // setUserId(res.data.user_id)
          // setUsername(res.data.username)
          dispatch(succesAuth(res.data))
          return
      }

      dispatch(succesLogout())
      getCSRF()
    })
    .catch((err) => {
      console.error(err)
      console.log(err.response.data.detail);
    })
  }

  const login = async () => {
    // console.log(serverURL + loginURL)
    // console.log(isLogin)
    // console.log(isPassword)
    const data = { username: isLogin, password: isPassword }
    await axios.post(serverURL + loginURL, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": isCsrf,
      }
    })
    .then((res) => {
      isResponseOk(res)
      // const data = res.data
      console.log(res.data.detail)
      // setIsAuth(true)
      // dispatch(succesAuth(data))
      setIsLogin('')
      setIsPassword('')
      setIsError(null)
      
      userInfo()
      // const { id } = useSelector(userSelector)
      // console.log(id)
      navigate(mainURL)
      console.log('Аутентификация выполнена успешно')
    })
    .catch((err) => {
      console.error(err);
      console.log(err.response.data.detail);
      setIsError("Неверные данные")
    });
  }

  // const logout = async () => {
  //   await axios.get(serverURL + logoutURL, { withCredentials: true })
  //   .then((res) => {
  //     isResponseOk(res)
  //     dispatch(succesAuth())
  //     getCSRF();
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //     console.log(err.response.data.detail);
  //   })
  // }

  const userInfo = () => {
    axios.get(serverURL + userInfoURL, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("Вы авторизованы как: " + res.data.user.login);
      dispatch(succesAuth(res.data))
      return res.data
    })
    .catch((err) => {
        if (err.status === 401) {
          console.log(err.error)
          console.log(err.response.data.detail)
        };
    });
  }

  // const killAllSessions = () => {
  //   axios.get(serverURL + removeSessionsURL, {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((res) => {
  //     isResponseOk(res)
  //     console.log(res.data.detail)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //     console.log(err.response.data.detail);
  //   })
  // }

  // function changePassword(e) {
  //     setIsPassword(e.target.value)
  // }

  // function changeLogin(e) {
  //     setIsLogin(e.target.value)
  //     console.log(isLogin)
  // }

  function submitForm(e) {
      e.preventDefault()
      login()
  }


  return(
    <div className=''>
        <div className=''>
          Вы
          <span className=''>
          {
            isAuth ? ' - ' + user.login   : ' неавторизованы' 
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
                    className='input__form'
                    onChange={(e) => changeLogin(e, setIsLogin)}
                    value={isLogin}
                />

                <label htmlFor="password">Пароль</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    className='input__form'
                    onChange={(e) => changePassword(e, setIsPassword)}
                    value={isPassword}
                />

                {
                    isError ? <div className='errors'>{isError}</div> : null
                }

                <input type="submit" value='Войти' onClick={submitForm} className='' />
            </form>
          :

            <div className=''>
             <LinkItemAction title="Выход" link={logoutURL} click={logout}/>
            </div>
                
        }
        
    </div>
  )
}

