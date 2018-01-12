import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar id="navbar" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav
            activeKey={this.props.location.pathname}
            onSelect={e => this.props.history.push(e)}
          >
            {this.props.routes.map(route => (
              <NavItem eventKey={route.path} key={route.name} href={route.path}>
                {route.count ? route.name + " - " + route.count : route.name}
              </NavItem>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
