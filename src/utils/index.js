import { serverURL, logoutURL, csrfURL, sessionURL, userInfoURL } from "../URLs/urls";
import { useDispatch } from "react-redux";
import { succesAuth, succesLogout } from "../redux/slices";
import axios from "axios";


export const isResponseOk = (res) => {
  if (!(res.status >= 200 && res.status <= 299)) {
    throw Error(res.statusText);
  }
}

export const getCSRF = async (setIsCsrf) => {
  await axios.get(serverURL + csrfURL, { withCredentials: true })
  .then((res) => {
    console.log('Запрос токена')
    isResponseOk(res)
    const csrfToken = res.headers.get('X-CSRFToken')
    setIsCsrf(csrfToken)
  })
  .catch((err) => console.error(err))
}

export const getSession = async (setIsCsrf) => {
  await axios.get(serverURL + sessionURL, { withCredentials: true })
  .then((res) => {
      if (res.data.isAuth) {
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

export const getUserInfo = async (id='', setMemberInfo=null) => {
  await axios.get(serverURL + userInfoURL + id, { 
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => {
    console.log('Получение данных о пользователе')
    if (setMemberInfo) {
      setMemberInfo(res.data.user)
    }
    
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
    console.log('Сессия завершена')
  })
  .catch((err) => {
    console.error(err)
    console.log(err.response.data.detail);
  })
}

export const validateForm = (data) => {
  const errors = {};
  const { username, password, email, fullName } = data

  if (!username.trim()) {
      errors.username = 'Поле логин обязательное!';
  } else if (!/^[a-zA-Z][a-zA-Z\d]{3,19}$/.test(username)) {
      errors.username = 'Логин болжен быть от 4 до 20 символов';
  }

  if (!email.trim()) {
      errors.email = 'Поле Email обязательное!';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Введён некорректный email';
  }

  if (!password) {
      errors.password = 'Поле пароль обязательное!';
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{6,}$/.test(password)) {
      errors.password = 'Пароль ненадёжен';
  }

  return errors;
};

export const getCsrfTokenFromCookie = () => {
  const cookieValue = document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))
    .split('=')[1];
  return cookieValue;
}

export const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = jQuery.trim(cookies[i])
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break;
      }
    }
  }
  return cookieValue;
}
