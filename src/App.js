import React from 'react';
import './App.scss';
import loanData from './loanData';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log(loanData)
  return (
    <Navbar collapseOnSelect bg="light" id="navbar" expand="lg">
      <Navbar.Brand href="#home">
        <img className="navbar__brand-img" src="https://uploads-ssl.webflow.com/5e067beb4c88a64e31622d4b/5e20ace96e02156e0600fa1f_favicon-webclip.png"></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="navbar__link" href="#dashboard">Dashboard</Nav.Link>
          <Nav.Link className="navbar__link" href="#link">Saved Plots</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;
