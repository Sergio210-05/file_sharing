import { NavLink } from "react-router"
import { AuthButton, LinkItem, NavInstance } from "../Buttons/AuthButton/AuthButton"
import { loginURL, logoutURL, sessionURL, registrationURL } from "../../URLs/urls"

export const PageHeader = ({user, isAuth}) => {
  const { username, fullName, isAdmin } = user;
  const adminLink = `/${username}/admin`;
  return (
    <div className="page-header__container">
      { isAuth ? 
        <>
          <div className="page-header__item">Вы вошли как {username}</div>
          <div className="page-header__item">{fullName}</div>
          <div className="page-header__item page-header__links">
            { isAdmin ?
              <LinkItem title="Администрирование" link={`/${username}/admin`}/> :
              ""
            }
            <LinkItem title="Выход" link="/logout"/>
          </div>

        </> :
        <>
          <LinkItem title="Вход" link={loginURL}/>
          <LinkItem title="Регистрация" link={registrationURL}/>
        </>
      }
    </div>
  )
}
