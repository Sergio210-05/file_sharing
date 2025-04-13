import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage/HomePage';
import { LoginPage } from '../Pages/LoginPage/LoginPage';
import { LogoutPage } from '../Pages/LogoutPage/LogoutPage';
import { RegistrationPage } from '../Pages/RegistrationPage/RegistrationPage';
import { ProfilePage } from '../ProfilePage/ProfilePage';
import { serverURL, mainURL, csrfURL, loginURL, logoutURL,
   sessionURL, registrationURL, profileURL, storageURL, 
   adminURL, adminUserStorageURL,
   downloadURL, 
} from "../../URLs/urls"
import { useDispatch, useSelector } from 'react-redux';
import { succesAuth, succesLogout } from '../../redux/slices';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { changeLogin, changePassword } from '../../utils';
import { StoragePage } from '../Pages/StoragePage/StoragePage';
import { AdminPage } from '../Pages/AdminPage/AdminPage';
import { ManageUserStorage } from '../Pages/ManageUserStorage/ManageUserStorage';
import { DownloadPage } from '../Pages/DownloadPage/DownloadPage';

export const PageMain = ({user, isAuth}) => {

  const [inpCsrf, setInpCsrf] = useState(null)
  const [inpLogin, setInpLogin] = useState('')
  const [inpPassword, setInpPassword] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    getSession()
  }, [])

  const isResponseOk = (res) => {
    if (!(res.status >= 200 && res.status <= 299)) {
      throw Error(res.statusText);
    }
  }

  const getCSRF = async () => {
    await axios.get(serverURL + csrfURL, { withCredentials: true })
    .then((res) => {
      console.log('Запрос токена')
      isResponseOk(res)
      const csrfToken = res.headers.get('X-CSRFToken')
      setInpCsrf(csrfToken)
    })
    .catch((err) => console.error(err))
}

  const getSession = () => {
    axios.get(serverURL + sessionURL, { withCredentials: true })
    .then((res) => {
      console.log('Проверка сессии')
      if (res.data.isAuth) {
        const data = res.data
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
          />}/>

        <Route path={registrationURL} element={<RegistrationPage 
          serverURL={serverURL} 
          />}/>

        <Route path={logoutURL} element={<LogoutPage />} />
        <Route path={profileURL} element={<ProfilePage />} />
        <Route path={storageURL} element={<StoragePage memberId={user.id}/>} />
        <Route path={adminURL} element={<AdminPage />}/>
        <Route path={adminUserStorageURL + ':id/'} element={<ManageUserStorage />}/>
        <Route path={downloadURL + ':storageTitle/'} element={<DownloadPage />}/>
      </Routes>
    </>
  )
}
