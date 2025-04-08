import { NavLink } from "react-router";
import axios from 'axios';
import { LinkItem, LinkItemAction } from "../Buttons/AuthButton/AuthButton"
import { serverURL, loginURL, logoutURL, sessionURL, registrationURL, adminURL } from "../../URLs/urls"
import { useDispatch, useSelector } from 'react-redux';
import { succesLogout } from '../../redux/slices';
import { isAuthSelector, userSelector, loginSelector, fullNameSelector, isAdminSelector } from '../../redux/selectors';
import { isResponseOk } from "../../utils";

export const PageHeader = ({ user, isAuth }) => {
  const { login, fullName, isAdmin } = user;
  const dispatch = useDispatch();

  const logout = async () => {
    await axios.get(serverURL + logoutURL, { withCredentials: true })
    .then((res) => {
      isResponseOk(res)
      dispatch(succesLogout());
    })
    .catch((err) => {
      console.error(err)
      console.log(err.response.data.detail);
    })
  }

  return (
    <div className="page-header__container">
      { isAuth ? 
        <>
          <div className="page-header__item">Вы вошли как {login}</div>
          <div className="page-header__item">{fullName}</div>
          <div className="page-header__item page-header__links">
            { isAdmin ?
              <LinkItem title="Администрирование" link={adminURL}/> :
              ""
            }
            <LinkItemAction title="Выход" link={logoutURL} click={logout}/>
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
