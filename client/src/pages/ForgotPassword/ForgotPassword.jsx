import Form from "react-bootstrap/Form";
import "./ForgotPassword.css";
import { Button } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, JWT_TOKEN_KEY } from "../../constants";
import { toastError, toastSuccess } from "../../utilities/toast";

export const ForgotPassword = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    if (!email) return toastError("Please fill all fields.");

    try {
      const response = await fetch(BASE_URL + "/users/send-reset-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toastSuccess("Reset email sent. Please check your inbox.");
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
      <h1>Forgot </h1>
      <h1> password</h1>

      <div className="center">
        <Form className="bg-color py-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address for password reset</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};
