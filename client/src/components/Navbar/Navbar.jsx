import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { toastSuccess } from "../../utilities/toast";
import { JWT_TOKEN_KEY } from "../../constants";

export function Navbar({ user, setUser }) {
  return (
    <BootstrapNavbar bg="dark" data-bs-theme="dark">
      <Container>
        <BootstrapNavbar.Brand>
          <Link to="/">Drink Stop</Link>
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/about">
            About
          </Link>
          {user ? (
            <>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <Link className="nav-link" to="/orders">
                Orders
              </Link>
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
              {user.role === "admin" && (
                <>
                  <Link className="nav-link" to="/manage-users">
                    Manage Users
                  </Link>
                  <Link className="nav-link" to="/manage-products">
                    Manage Products
                  </Link>
                </>
              )}
              <Link
                className="nav-link"
                to="/"
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem(JWT_TOKEN_KEY);
                  toastSuccess("Successfully logged out.");
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}
