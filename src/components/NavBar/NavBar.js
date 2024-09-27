import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Search from '../Search/Search';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
      <Navbar expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/students">Students</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addstudent">Add Student</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/searchthanthanh">God Search</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Search />
      </Navbar>
  );
}

export default NavBar;