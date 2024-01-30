import "./Profile.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { api } from "../../utilities/api";
import { toastError, toastSuccess } from "../../utilities/toast";
import { Button } from "../../components/Button/Button";

export const Profile = ({ user }) => {
  const [editedUser, setEditedUser] = useState(null);
  const handleClose = () => setEditedUser(false);

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.updateUsers(editedUser._id, editedUser);
      if (result.ok) {
        toastSuccess("Changes saved successfully");
        handleClose();
      } else {
        const errorMessages = await result.text();
        throw new Error(errorMessages);
      }
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  return (
    <div id="Profile">
      <h1>Profile</h1>s
      <section className="bg-color container p-5 text-align-left">
        <div style={{ textAlign: "left" }}>
          <Button variant="dark" onClick={handleEdit}>
            Edit
          </Button>
          <Modal
            show={editedUser}
            onHide={handleClose}
            centered={true}
            backdrop={true}
          >
            {editedUser && (
              <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      name="name"
                      value={editedUser.fullName}
                      onChange={(e) =>
                        setEditedUser((user) => ({
                          ...user,
                          fullName: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser((user) => ({
                          ...user,
                          email: e.target.value,
                        }))
                      }
                      min={1}
                      step={0.01}
                      name="email"
                      type="email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="http://..."
                      name="image"
                      value={editedUser.imageUrl}
                      onChange={(e) =>
                        setEditedUser((user) => ({
                          ...user,
                          imageUrl: e.target.value,
                        }))
                      }
                    />
                  </Form.Group>

                  <Form.Select
                    onChange={(e) =>
                      setEditedUser((user) => ({
                        ...user,
                        role: e.target.value,
                      }))
                    }
                    value={editedUser.role}
                    name="role"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Modal>
        </div>
      </section>
    </div>
  );
};
