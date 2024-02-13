import Form from "react-bootstrap/Form";
import { Button } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useRef } from "react";
import { BASE_URL, JWT_TOKEN_KEY, MIN_FULL_NAME_LENGTH } from "../../constants";
import { toastError, toastSuccess } from "../../utilities/toast";
import {
  validateAddress,
  validateEmail,
  validateFile,
  validateFullName,
  validatePassword,
  validatePhone,
} from "../../utilities/validations";

export const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const file = fileInputRef.current.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        return toastError(error);
      }
    }

    const fullNameError = validateFullName(formData.get("fullName"));
    if (fullNameError) {
      return toastError(
        `Full name must be at least ${MIN_FULL_NAME_LENGTH} characters long.`
      );
    }

    const email = formData.get("email");
    const emailError = validateEmail(email);
    if (emailError) {
      return toastError(emailError);
    }

    const phone = formData.get("phone");
    const phoneError = validatePhone(phone);
    if (phoneError) {
      return toastError(phoneError);
    }

    const address = formData.get("address");
    const addressError = validateAddress(address);
    if (addressError) {
      return toastError(addressError);
    }

    const password = formData.get("password");
    const passwordError = validatePassword(password);
    if (passwordError) {
      return toastError(passwordError);
    }

    formData.append("avatar", file);

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
