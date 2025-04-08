import axios from "axios"
import { registrationURL, serverURL } from "../../URLs/urls"
import { changeSth, getCSRF, validateForm } from "../../utils"
import { useEffect, useState } from "react"

export const NewUserItem = ({ cancel }) => {

  const [inputLogin, setInpLogin] = useState('')
  const [inputEmail, setInpEmail] = useState('')
  const [inputPassword, setInpPassword] = useState('')
  const [inputFullName, setInpFullName] = useState('')
  const [isCsrf, setIsCsrf] = useState(null)

  useEffect(() => {
    getCSRF(setIsCsrf)
  }, [])

  const registerNewUser = async (data) => {
    await axios.post(
      serverURL + registrationURL, 
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": isCsrf,
        }
      }
    )
    .then((res) => {
      console.log('Пользователь зарегистрирован')
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const submitForm = () => {
    console.log(inputLogin, inputPassword, inputEmail, inputFullName)
    const data = { username: inputLogin, password: inputPassword, email: inputEmail, fullName: inputFullName }
    const newErrors = validateForm(data)
    console.log(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Данные формы корректны')
      registerNewUser(data)
    } else {
      console.log('Данные формы некорректны')
    }
  }

  return (
    <>
      <div>
        <form className="form__new-user">
          <div className="form__new-user__username">
            <label htmlFor="login">Введите логин пользователя: </label>
            <input type="text" name="login" onChange={(e) => changeSth(e, setInpLogin)}/>
          </div>
          <div className="form__new-user__email">
            <label htmlFor="email">Введите почту пользователя: </label>
            <input type="text" name="email" onChange={(e) => changeSth(e, setInpEmail)} />
          </div>
          <div className="form__new-user__full-name">
            <label htmlFor="full-name">Введите полное имя пользователя: </label>
            <input type="text" name="full-name" onChange={(e) => changeSth(e, setInpFullName)} />
          </div>
          <div className="form__new-user__password">
            <label htmlFor="user__password">Введите пароль пользователя: </label>
            <input type="text" name="user__password" onChange={(e) => changeSth(e, setInpPassword)} />
          </div>
          <div className="form-change-field">
            <button onClick={submitForm}>Зарегистрировать</button>
            <button onClick={cancel}>Отмена</button>
          </div>
        </form>
      </div>
    </>
  )
}
