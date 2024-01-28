import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  return (
    <BootstrapNavbar bg="dark" data-bs-theme="dark">
      <Container>
        <BootstrapNavbar.Brand>
          <Link to="/">Drink Stop</Link>
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/about">About</Link>
          </Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}
