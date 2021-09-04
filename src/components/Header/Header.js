import React, { PureComponent } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap/";
import { Link } from "react-router-dom";

class Header extends PureComponent {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Link to="/">
          <Navbar.Brand>AirLines</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Start
            </Link>
            <Link to="/allFlights" className="nav-link">
              Flights
            </Link>
            <Link to="/allTourists" className="nav-link">
              Tourists
            </Link>
            <Link to="/addFlight" className="nav-link">
              Add Flight
            </Link>
            <Link to="/addTourist" className="nav-link">
              Add Tourist
            </Link>

          </Nav>
        </Navbar.Collapse>
        <Button onClick={this.props.setMonolith} variant={this.props.isMonolith ? "primary" : "success"}>
              Switch Endpoints
          </Button>
      </Navbar>
    );
  }
}

export default Header;
