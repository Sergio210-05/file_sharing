import './LoginPage.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { mainURL, csrfURL, loginURL, logoutURL, sessionURL, userInfoURL } from "../../../URLs/urls";
import { LinkItemAction } from "../../Buttons/AuthButton/AuthButton";
import { useDispatch, useSelector } from 'react-redux';
import { succesAuth, succesLogout } from '../../../redux/slices';
import { isAuthSelector } from '../../../redux/selectors';
import { changeLogin, changePassword, logout, isResponseOk } from "../../../utils";
import { useNavigate } from "react-router-dom";


export const LoginPage = ({serverURL, user}) => {
  const [isCsrf, setIsCsrf] = useState(null)
  const [isLogin, setIsLogin] = useState('')
  const [isPassword, setIsPassword] = useState('')
  const [isError, setIsError] = useState(null)
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector)
  

  useEffect(() => {
    getSession()
  }, [])
  const navigate = useNavigate()

  const getCSRF = async () => {
    await axios.get(serverURL + csrfURL, { withCredentials: true })
    .then((res) => {
      console.log('Запрос токена')
      isResponseOk(res)
      const csrfToken = res.headers.get('X-CSRFToken')
      setIsCsrf(csrfToken)
    })
    .catch((err) => console.error(err))
  }

  const getSession = async () => {
    await axios.get(serverURL + sessionURL, { withCredentials: true })
    .then((res) => {
      console.log('Проверка сессии')
      if (res.data.isAuth) {
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
      console.log(res.data.detail)
      setIsLogin('')
      setIsPassword('')
      setIsError(null)
      
      userInfo()
      navigate(mainURL)
      console.log('Аутентификация выполнена успешно')
    })
    .catch((err) => {
      console.error(err);
      console.log(err.response.data.detail);
      setIsError("Неверные данные")
    });
  }

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

