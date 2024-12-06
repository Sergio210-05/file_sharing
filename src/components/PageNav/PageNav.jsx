import { NavLink } from "react-router-dom";
import { AuthButton } from "../Buttons/AuthButton/AuthButton";

export const PageNav = () => {
  return (
    <>
      <ul className="nonemark">
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/storage">Хранилище</NavLink>
        </li>
        <li>
          <NavLink to="profile">Профиль</NavLink>
        </li>
      </ul>
    </>
  )
}
