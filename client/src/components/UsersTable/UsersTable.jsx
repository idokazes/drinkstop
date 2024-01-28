import BootstrapTable from "react-bootstrap/Table";
import { Button } from "../Button/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { api } from "../../utilities/api";
import { toastError, toastSuccess } from "../../utilities/toast";
import { BASE_URL } from "../../constants";
import "./UsersTable.css";
import { Avatar } from "../Avatar/Avatar";

export function UsersTable({ fetchUsers, body }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const handleEdit = (user) => {
    setEditedUser(user);
    handleShow();
  };

  const handleDelete = async (user) => {
    try {
      const response = await api.deleteUser(user._id);
      if (response.ok) {
        toastSuccess("User deleted successfully");
        fetchUsers();
      } else {
        const errorMessages = await response.text();
        throw new Error(errorMessages);
      }
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.updateUsers(editedUser._id, editedUser);
      if (result.ok) {
        toastSuccess("User edited successfully");
        fetchUsers();
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
    <>
      <BootstrapTable striped bordered hover id="users-table">
        <thead>
          <tr>
            {["#", "Avatar", "Full Name", "Email", "Role", "Actions"].map(
              (header) => {
                return <th key={header}>{header}</th>;
              }
            )}
          </tr>
        </thead>
        <tbody>
          {body.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className="center">
                  <Avatar user={user} />
                </td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="actions">
                    <Button onClick={() => handleEdit(user)}>Edit</Button>{" "}
                    <Button onClick={() => handleDelete(user)}>Delete</Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </BootstrapTable>
      <Modal
        show={showEditModal}
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
                <Form.Label>Product price</Form.Label>
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
    </>
  );
}
