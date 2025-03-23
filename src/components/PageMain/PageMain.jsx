import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage/HomePage';
import { LoginPage } from '../Pages/LoginPage/LoginPage';
import { LogoutPage } from '../Pages/LogoutPage/LogoutPage';
import { RegistrationPage } from '../Pages/RegistrationPage/RegistrationPage';
import { ProfilePage } from '../ProfilePage/ProfilePage';
import { serverURL, mainURL, csrfURL, loginURL, logoutURL,
   sessionURL, registrationURL, profileURL, storageURL, 
   adminURL, adminUserStorageURL, 
} from "../../URLs/urls"
import { useDispatch, useSelector } from 'react-redux';
import { succesAuth, succesLogout } from '../../redux/slices';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { changeLogin, changePassword } from '../../utils';
import { StoragePage } from '../Pages/StoragePage/StoragePage';
import { AdminPage } from '../Pages/AdminPage/AdminPage';
import { ManageUserStorage } from '../Pages/ManageUserStorage/ManageUserStorage';

export const PageMain = ({user, isAuth}) => {

  const [inpCsrf, setInpCsrf] = useState(null)
  const [inpLogin, setInpLogin] = useState('')
  const [inpPassword, setInpPassword] = useState('')
  // const [inpError, setInpError] = useState(null)
  // // const [inpAuth, setIsAuth] = useState(false)
  // const [username, setUsername] = useState('')
  // const [userId, setUserId] = useState(null)
  const dispatch = useDispatch();
  // const { isAuth } = useSelector((state) => state.authReducer)

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
        setInpCsrf(csrfToken)
    })
    .catch((err) => console.error(err))
}

  const getSession = () => {
    axios.get(serverURL + sessionURL, { withCredentials: true })
    .then((res) => {
        if (res.data.isAuth) {
          // setUserId(res.data.user_id)
          // setUsername(res.data.username)
          const data = res.data
          // console.log(data)
          dispatch(succesAuth(data))
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

  const logout = async () => {
    await axios.get(serverURL + logoutURL, { withCredentials: true })
    .then((res) => {
      isResponseOk(res)
      dispatch(succesLogout());
      getCSRF();
    })
    .catch((err) => {
      console.error(err)
      console.log(err.response.data.detail);
    })
  }
  
  // const changeLogin = (e) => {
  //   setInpLogin(e.target.value)
  //   console.log(inpLogin)
  // }
  // const changePassword = (e) => {
  //   setInpPassword(e.target.value)
  // }

  const submitForm = (e, handler) => {
    e.preventDefault()
    handler()
  }

  return (
    <>
      <Routes>
        <Route path={mainURL} element={<HomePage isAuth={isAuth} />} />

        <Route path={loginURL} element={<LoginPage 
          serverURL={serverURL} 
          user={user}
          // changeLogin={changeLogin} 
          // changePassword={changePassword} 
          />}/>

        <Route path={registrationURL} element={<RegistrationPage 
          serverURL={serverURL} 
          // changeLogin={changeLogin} 
          // changePassword={changePassword} 
          />}/>

        <Route path={logoutURL} element={<LogoutPage />} />
        <Route path={profileURL} element={<ProfilePage />} />
        <Route path={storageURL} element={<StoragePage />} />
        <Route path={adminURL} element={<AdminPage />}/>
        <Route path={adminUserStorageURL + ':id/'} element={<ManageUserStorage />}/>
      </Routes>
    </>
  )
}
