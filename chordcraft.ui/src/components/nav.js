import React, { useState } from 'react';
import { NavLink as RouteLink } from "react-router-dom";
import { withRouter } from "react-router";

import {
  Collapse,
  Dropdown,
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
  NavbarText
} from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav">
      <Navbar className="container w-100" color="transparent" light expand="md">
        <NavbarBrand tag={RouteLink} to="/">ChordCraft</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RouteLink} to="/song">+Song</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteLink} to="/song-library">Song Library</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={RouteLink} to="/profile">
                  Profile
                </DropdownItem>
                <DropdownItem tag={RouteLink} to="/my-songs">
                  Songs
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  )
};

export default withRouter(Navigation);
