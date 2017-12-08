import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav
            activeKey={this.props.location.pathname}
            onSelect={e => this.props.history.push(e)}
          >
            <NavItem eventKey="/" href="/">
              Home
            </NavItem>
            <NavItem eventKey="/grocerylist" href="/grocerylist">
              Grocery List
            </NavItem>

            <NavItem eventKey="/goingcook" href="/goingcook">
              Going to Cook
            </NavItem>

            <NavItem eventKey="/savedrecipes" href="/savedrecipes">
              Saved Recipes
            </NavItem>
          </Nav>
          {/* <div className="navbarLinks">
            <ul className="nav navbar-nav">
              <li>
                <NavLink
                  activeClassName="active btn-primary"
                  className="btn"
                  exact
                  to="/lost"
                >
                  Grocery
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="active btn-primary"
                  className="btn"
                  exact
                  to="/"
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </div> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
