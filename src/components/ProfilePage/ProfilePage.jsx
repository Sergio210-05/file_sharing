import axios from "axios"
import { profileURL, serverURL } from "../../URLs/urls"

export const ProfilePage = () => {

  const getUserInfo = async () => {
    await axios.get(serverURL + profileURL, { 
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

  getUserInfo()

  return (
    <div>ProfilePage</div>
  )
}
