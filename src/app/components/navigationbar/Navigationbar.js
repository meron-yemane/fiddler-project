import React from 'react';
import './Navigationbar.scss';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect bg="light" id="navbar" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img className="navbar__brand-img" src="https://uploads-ssl.webflow.com/5e067beb4c88a64e31622d4b/5e20ace96e02156e0600fa1f_favicon-webclip.png"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/dashboard" className="navbar__link">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/generateplot" className="navbar__link">Generate Plots</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Navigationbar