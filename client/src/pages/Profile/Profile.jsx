import "./Profile.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../../utilities/toast";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { BASE_URL, JWT_TOKEN_KEY, MIN_FULL_NAME_LENGTH } from "../../constants";
import { Avatar } from "../../components/Avatar/Avatar";
import {
  validateAddress,
  validateEmail,
  validateFile,
  validateFullName,
  validatePassword,
  validatePhone,
} from "../../utilities/validations";
import { api } from "../../utilities/api";

export const Profile = ({ user, setUser }) => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    } else {
      navigate("/");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const file = fileInputRef.current.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        return toastError(error);
      }
      formData.append("avatar", file);
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

    const phoneError = validatePhone(formData.get("phone"));
    if (phoneError) {
      return toastError(phoneError);
    }

    const addressError = validateAddress(formData.get("address"));
    if (addressError) {
      return toastError(addressError);
    }

    const password = formData.get("password");
    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        return toastError(passwordError);
      }
    } else {
      formData.delete("password");
    }

    try {
      const response = await api.updateUsers(user._id, formData);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }
      const userData = await response.json();
      setUser(userData);
      toastSuccess("User updated successfully.");
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  if (!user) return null;

  return (
    <div id="profile">
      <h1>Profile</h1>
      <div className="center">
        <Form className="bg-color" onSubmit={handleSubmit}>
          <Avatar user={user} size={100} style={{ alignSelf: "center" }} />
          <br />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="fullName"
              required
              minLength={MIN_FULL_NAME_LENGTH}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" ref={fileInputRef} />
          </Form.Group>

          <Button type="submit">Save</Button>
        </Form>
      </div>
    </div>
  );
};
