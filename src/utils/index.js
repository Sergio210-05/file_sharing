import { serverURL, logoutURL, csrfURL, sessionURL } from "../URLs/urls";
import { useDispatch } from "react-redux";
import { succesAuth, succesLogout } from "../redux/slices";
import axios from "axios";


export const isResponseOk = (res) => {
  if (!(res.status >= 200 && res.status <= 299)) {
    throw Error(res.statusText);
  }
}

export const getCSRF = (setIsCsrf) => {
  axios.get(serverURL + csrfURL, { withCredentials: true })
  .then((res) => {
      isResponseOk(res)

      const csrfToken = res.headers.get('X-CSRFToken')
      setIsCsrf(csrfToken)
  })
  .catch((err) => console.error(err))
}

export const getSession = (setIsCsrf) => {
  axios.get(serverURL + sessionURL, { withCredentials: true })
  .then((res) => {
      if (res.data.isAuth) {
          // setUserId(res.data.user_id)
          // setUsername(res.data.username)
          // dispatch(succesAuth(res.data))
          return
      }

      // dispatch(succesLogout())
      getCSRF(setIsCsrf)
  })
  .catch((err) => {
    console.error(err)
    console.log(err.response.data.detail);
  })
}

export const getUserInfo = async (url) => {
  await axios.get(serverURL + url, { 
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((err) => {
    console.error(err)
  })
}

export const changeLogin = (e, setLogin) => {
  setLogin(e.target.value)
}

export const changePassword = (e, setPassword) => {
  setPassword(e.target.value)
}

export const changeSth = (e, setSomething) => {
  setSomething(e.target.value)
}

export const logout = async () => {
  await axios.get(serverURL + logoutURL, { withCredentials: true })
  .then((res) => {
    isResponseOk(res)
    const dispatch = useDispatch();
    dispatch(succesLogout());
  })
  .catch((err) => {
    console.error(err)
    console.log(err.response.data.detail);
  })
}