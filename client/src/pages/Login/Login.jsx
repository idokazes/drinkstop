import Form from "react-bootstrap/Form";
import "./Login.css";
import { Button } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, JWT_TOKEN_KEY } from "../../constants";
import { toastError, toastSuccess } from "../../utilities/toast";

export const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) return toastError("Please fill all fields.");

    try {
      const response = await fetch(BASE_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem(JWT_TOKEN_KEY, userData.jwtToken);
        toastSuccess("Successfully logged in.");
        setUser(userData);
        navigate("/");
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(error);
      toastError(error.message);
    }
  };
  return (
    <div id="login">
      <h1>Login</h1>

      <div className="center">
        <Form className="bg-color py-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>

          <Button type="submit">Submit</Button>
          <br />
          <br />
          <Link to="/register">Don't have an account? Register here</Link>
          <br />
          <br />
          <Link to="/forgot-password">Forgot your password? click here</Link>
        </Form>
      </div>
    </div>
  );
};
