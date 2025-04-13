import axios from "axios"
import { profileURL, serverURL } from "../../URLs/urls"
import { useSelector } from "react-redux"
import { userSelector } from "../../redux/selectors"

export const ProfilePage = () => {

  const user = useSelector(userSelector)
  const { id, email, fullName, login, isAdmin } = user

  return (
    <>
      <div>Ваш логин: {login}</div>
      <div>Ваш e-mail: {email}</div>
      <div>Ваше имя: {fullName}</div>
    </>
  )
}
