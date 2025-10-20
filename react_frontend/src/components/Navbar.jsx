import React from "react";
import Avatar from "react-avatar";
import { Navbar, Container, Dropdown, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css'; // ensure CSS import

export default function AppNavbar({ isLogin, onLoginClick, info, onLogOutClick }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="px-4">
        <Navbar.Brand href="/" className="fs-2 fw-bold d-flex align-items-center gap-1">
          <img src={logo} height={40} alt="LOGO" />
          Day Planner
        </Navbar.Brand>

        <div className="ms-auto">
          {isLogin ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-avatar">
                <Avatar name={info.name} size="44" round={true} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/profile"><i class="fa-solid fa-user"></i> Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogOutClick}><i class="fa-solid fa-right-from-bracket"></i> Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button variant="danger" onClick={onLoginClick}>
              <i className="fa-solid fa-arrow-right-to-bracket me-1"></i> Login/Register
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
