import React from 'react';

import {
    Navbar, NavDropdown, Form, Button
} from 'react-bootstrap';

const Header = () => (
    <Navbar bg="light" fixed="top" className="border-bottom border-gray bg-white">
        <Navbar.Brand href="#home">Treatabolome</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Form inline>
            <Button href="#" variant="dark">Login</Button>{' '}
            <Navbar.Text>
              Signed in as:
            </Navbar.Text>
            <NavDropdown title={"Mark Otto"} id="basic-nav-dropdown">
                <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
        </Form>
        </Navbar.Collapse>
    </Navbar> 
);

export default Header;