import { loginURL, logoutURL, sessionURL, registrationURL } from "../../../URLs/urls"
import { LinkItem } from "../../Buttons/AuthButton/AuthButton"

export const HomePage = ({isAuth}) => {

  return (
    <>
      {!isAuth ? 
      <>
        <div>
          Приветствуем Вас на нашем сервисе! <br></br>
          Для продолжения работы пожалуйста авторизуйтесь.
        </div>
        <LinkItem title="Вход" link={loginURL}/>
        <LinkItem title="Регистрация" link={registrationURL}/>
      </>
       :
      <div>
        Для начала работы воспользуйтесь навигационным меню в левой части окна
      </div>
      }
  </>
  )
}
