import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { toastSuccess } from "../../utilities/toast";
import { JWT_TOKEN_KEY } from "../../constants";
import { Avatar } from "../Avatar/Avatar";

export function Navbar({ user, setUser }) {
  return (
    <BootstrapNavbar bg="dark" data-bs-theme="dark" expand={"sm"}>
      <Container>
        <BootstrapNavbar.Brand>
          <Link to="/">
            <img
              src="/android-chrome-256x256.png"
              alt="logo"
              width={50}
              style={{ borderRadius: "10px", marginRight: "10px" }}
            />
            <div className="pl-5" style={{ display: "inline-block" }}>
              Drink Stop
            </div>
          </Link>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            <>
              <Nav className="w-100 align-items-center">
                <Link className="nav-link" to="/about">
                  About
                </Link>
                {user ? (
                  <>
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
                <div className="nav-link" style={{ flex: 1 }}></div>
                {user && <Avatar user={user} size={50} />}
              </Nav>
            </>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
