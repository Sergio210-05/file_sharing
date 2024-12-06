import React from 'react'

export const RegistrationPage = ({serverURL}) => {
  return (
    <div>
      {
        !isAuth ?
          <form className=''>
              <label htmlFor="login">Логин</label>
              <input 
                  type="text" 
                  name="login" 
                  id="login" 
                  className=''
                  // onChange={changeLogin}
                  // value={isLogin}
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
