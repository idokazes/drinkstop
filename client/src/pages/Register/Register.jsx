import Form from "react-bootstrap/Form";
import { Button } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useRef } from "react";
import { BASE_URL, JWT_TOKEN_KEY } from "../../constants";
import { toastError, toastSuccess } from "../../utilities/toast";

const ALLOWED_EXTENSIONS = ["png", "jpeg", "jpg"];
const MIN_FULL_NAME_LENGTH = 3;
const MIN_EMAIL_LENGTH = 5;

export const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const file = fileInputRef.current.files[0];
    if (file) {
      const extention = file.name.split(".").pop();
      if (!ALLOWED_EXTENSIONS.includes(extention)) {
        toastError("File type not allowed. Please upload a png or jpg file.");
        return;
      }
    }

    if (formData.get("fullName").length < MIN_FULL_NAME_LENGTH) {
      return toastError(
        `Full name must be at least ${MIN_FULL_NAME_LENGTH} characters long.`
      );
    }

    const email = formData.get("email");
    if (email.length < MIN_EMAIL_LENGTH) {
      return toastError(
        `Email must be at least ${MIN_EMAIL_LENGTH} characters long.`
      );
    }

    if (email.indexOf("@") === -1) {
      return toastError("Email must contain @.");
    }

    if (email.indexOf(".") === -1) {
      return toastError(`Email must contain "."`);
    }

    if (formData.get("phone").length < 10) {
      return toastError("Phone number must be at least 10 characters long.");
    }

    if (formData.get("address").length < 3) {
      return toastError("Address must be at least 3 characters long.");
    }

    const password = formData.get("password");
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d.*\\d.*\\d.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );

    if (!regex.test(password)) {
      return toastError(
        "Password must contain at least 8 characters, one uppercase, one lowercase, at least 4 digits and one special case character"
      );
    }

    formData.append("avatar", file);
    console.log("fileInputRef.current.files[0]", fileInputRef.current.files[0]);

    try {
      const response = await fetch(BASE_URL + "/users/register", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }
      const userData = await response.json();
      localStorage.setItem(JWT_TOKEN_KEY, userData.jwtToken);
      setUser(userData);
      toastSuccess("User registered successfully.");
      navigate("/");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };
  return (
    <div id="register">
      <h1>Register</h1>

      <div className="center">
        <Form className="bg-color" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="fullName"
              required
              minLength={MIN_FULL_NAME_LENGTH}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phone"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" ref={fileInputRef} />
          </Form.Group>

          <Button type="submit">Submit</Button>
          <br />
          <br />
          <Link to="/login">Already have an account? Login here</Link>
        </Form>
      </div>
    </div>
  );
};
