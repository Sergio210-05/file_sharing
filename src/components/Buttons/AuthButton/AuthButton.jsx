import { ButtonToolbar, Button, Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const AuthButton = ({title, link, isLinkStyle=false}) => {
  return (
    <ul className="nonemark">
      <li>
        <Button href={link} bsstyle={isLinkStyle ? "link" : "primary"}>{title}</Button>
      </li>
    </ul>

  )
};


export const NavInstance = ({title, link}) => {
  return (
    <Nav bsstyle="pills">
      <NavItem href={link}>{title}</NavItem>
    </Nav>
  )
};


export const LinkItem = ({title, link}) => {
  return (
    <ul className="nonemark">
      <li>
        <NavLink to={link}>{title}</NavLink>
      </li>
    </ul>
  )
};

export const LinkItemAction = ({title, link, click}) => {
  return (
    <ul className="nonemark">
      <li>
        <NavLink to={link} onClick={click}>{title}</NavLink>
      </li>
    </ul>
  )
};
