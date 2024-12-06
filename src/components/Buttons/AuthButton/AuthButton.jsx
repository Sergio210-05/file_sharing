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

// const navInstance = (
//   <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
//     <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
//     <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
//     <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
//   </Nav>
// );