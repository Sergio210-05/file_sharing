import './RegistrationPage.css'
import React from 'react'
import axios from 'axios'
import { serverURL, registrationURL, logoutURL } from '../../../URLs/urls'
import { changeLogin, changePassword, changeSth, logout, isResponseOk, getSession, validateForm } from '../../../utils'
import { LinkItemAction } from '../../Buttons/AuthButton/AuthButton'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../../redux/selectors'


export const RegistrationPage = () => {
  const [isCsrf, setIsCsrf] = useState(null)
  const [isLogin, setIsLogin] = useState('')
  const [isPassword, setIsPassword] = useState('')
  const [isEmail, setIsEmail] = useState('')
  const [isFullName, setIsFullName] = useState('')
  const [isError, setIsError] = useState(null)
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false)
  const [errors, setErrors] = useState({});
  const isAuth = useSelector(isAuthSelector)

  useEffect(() => {
    getSession(setIsCsrf)
  }, [])

  const registration = (data) => {
    // const data = { username: isLogin, password: isPassword, email: isEmail, fullName: isFullName }
    axios.post(serverURL + registrationURL, 
      data, 
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": isCsrf,
        }
      })
    .then((res) => {
      isResponseOk(res)
      setIsLogin('')
      setIsPassword('')
      setIsEmail('')
      setIsFullName('')
      setIsError(null)
      setIsSuccessRegistration(true)
      console.log(res.data.detail)
      console.log('Регистрация прошла успешно')
      
      // userInfo()
    })
    .catch((err) => {
      console.error(err);
      console.log(err.response.data.detail);
      setIsError("Неверные данные")
    });
  }

  // const validateForm = (data) => {
  //   const errors = {};
  //   const { username, password, email, fullName } = data

  //   if (!username.trim()) {
  //       errors.username = 'Поле логин обязательное!';
  //   } else if (!/^[a-zA-Z][a-zA-Z\d]{3,19}$/.test(username)) {
  //       errors.username = 'Логин болжен быть от 4 до 20 символов';
  //   }

  //   if (!email.trim()) {
  //       errors.email = 'Поле Email обязательное!';
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //       errors.email = 'Введён некорректный email';
  //   }

  //   if (!password) {
  //       errors.password = 'Поле пароль обязательное!';
  //   } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{6,}$/.test(password)) {
  //       errors.password = 'Пароль ненадёжен';
  //   }

  //   return errors;
  // };
  

  const submitForm = (e) => {
    e.preventDefault()
    const data = { username: isLogin, password: isPassword, email: isEmail, fullName: isFullName }
    const newErrors = validateForm(data)
    setErrors(newErrors)
    // console.log(data)
    // console.log(errors)
    // console.log(Object.keys(errors))

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      console.log('Данные формы корректны')
      registration(data)
    } else {
      console.log('Данные формы некорректны')
    }
    
  }

  return (
    <div>
      {
        !isAuth ?
          <form className='reg__form'>
            <div>
              <label htmlFor="login">Логин</label>
              <input 
                type="text" 
                name="login" 
                id="login" 
                className='input__form'
                onChange={(e) => changeLogin(e, setIsLogin)}
                value={isLogin}
                placeholder='от 4 до 20 символов'
                title='только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов'
              />
              {errors.username && (
                <span className='errors'>
                  {errors.username}
                </span>
              )}
            </div>
                
            <div>
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                name="email" 
                id="email" 
                className='input__form'
                onChange={(e) => changeSth(e, setIsEmail)}
                value={isEmail}
                placeholder='example@gmail.com'
              />
              {errors.email && (
                <span className='errors'>
                    {errors.email}
                </span>
              )}
            </div>

              <label htmlFor="fullName">Имя</label>
              <input 
                type="text" 
                name="fullName" 
                id="fullName" 
                className='input__form'
                onChange={(e) => changeSth(e, setIsFullName)}
                value={isFullName}
              />

            <div>
              <label htmlFor="password">Пароль</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                className='input__form'
                onChange={(e) => changePassword(e, setIsPassword)}
                value={isPassword}
                title='от 6 символов, должны присутствовать заглавная, цифра и спецсимвол'
              />
              {errors.password && (
                <span className='errors'>
                  {errors.password}
                </span>
              )}
            </div>
              {
                  isSuccessRegistration ? <div>Вы успешно зарегистрировались!</div> : ''
              }
              {
                  isError ? <div className='{style.error}'>{isError}</div> : null
              }

              <input type="submit" value='Зарегистрироваться' onClick={(e) => submitForm(e)} className='' />
          </form>
        :
          <div className=''>
          <LinkItemAction title="Выход" link={logoutURL} click={logout}/>
          </div>
              
      }
    </div>
  )
}
