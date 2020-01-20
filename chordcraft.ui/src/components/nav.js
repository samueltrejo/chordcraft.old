import React, { useState } from 'react';
import { NavLink as RouteLink } from "react-router-dom";
import { withRouter } from "react-router";

import authRequests from '../requests/auth';

import {
  Collapse,
  // Dropdown,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // NavbarText
} from 'reactstrap';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutClickEvent = () => {
    authRequests.logoutUser()
      .then(() => console.error())
      .catch(error => console.error(error));
  }

  const loginOptions = props.authed && props.profile
    ? (<UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {props.profile.username ? (props.profile.username) : (props.profile.email)}
      </DropdownToggle>
      <DropdownMenu style={{background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))'}} right>
        <DropdownItem tag={RouteLink} to="/profile">
          Profile
        </DropdownItem>
        <DropdownItem tag={RouteLink} to="/my-songs">
          Songs
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={logoutClickEvent}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>) : (<NavItem><NavLink tag={RouteLink} to="/login-options">Login</NavLink></NavItem>);

  return (
    <div className="navigation fixed-top">
      <Navbar className="container w-100" color="transparent" dark expand="md">
        <NavbarBrand className="brand lead" tag={RouteLink} to="/"><div className="display-4">Chordcraft</div></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto lead" navbar>
            <NavItem>
              <NavLink tag={RouteLink} to={props.authed ? ("/song") : ("/login-options")}>+Song</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteLink} to="/song-library">Song Library</NavLink>
            </NavItem>
            {loginOptions}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  )
};

export default withRouter(Navigation);
