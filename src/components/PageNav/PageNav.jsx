import { NavLink } from "react-router-dom";
import { AuthButton } from "../Buttons/AuthButton/AuthButton";
import { profileURL, storageURL } from "../../URLs/urls";

export const PageNav = () => {
  return (
    <>
      <ul className="nonemark">
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to={storageURL}>Хранилище</NavLink>
        </li>
        <li>
          <NavLink to={profileURL}>Профиль</NavLink>
        </li>
      </ul>
    </>
  )
}
