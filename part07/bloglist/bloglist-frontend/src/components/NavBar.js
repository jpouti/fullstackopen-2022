import { Link } from "react-router-dom";
import Notification from "./Notification";
import { Navbar, Nav, Button } from "react-bootstrap";
import "../styles/bootstrap.css";

const NavBar = ({ user, logoutHandler, errorMessage, notifyMessage }) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="md" className="navbar-light bg-primary">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-nav me-auto">
            <Link to="/" className="nav-link">
              blogs
            </Link>
            <Link to="/users" className="nav-link">
              users
            </Link>
            {user !== null && (
              <div className="nav justify-content-center">
                <em className="nav-link">{user.name} logged in</em>
                <Link to="/">
                  <Button onClick={() => logoutHandler()}>logout</Button>
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <div>
          <h2>blog app</h2>
          {errorMessage !== null && (
            <Notification message={errorMessage} styles="errorMsg" />
          )}
          {notifyMessage !== null && (
            <Notification message={notifyMessage} styles="succesfulEvent" />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
