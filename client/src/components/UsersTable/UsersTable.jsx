import BootstrapTable from "react-bootstrap/Table";
import { Button } from "../Button/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { api } from "../../utilities/api";
import { toastError, toastSuccess } from "../../utilities/toast";
import "./UsersTable.css";
import { Avatar } from "../Avatar/Avatar";
import { Pencil, Trash3 } from "react-bootstrap-icons";

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
                return (
                  <th key={header} className={header.toLowerCase()}>
                    {header}
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody>
          {body.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className="numbering">{index + 1}</td>
                <td className=" ">
                  <Avatar user={user} className={"imageContainer"} />
                </td>
                <td>{user.fullName}</td>
                <td className="email">{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="actions">
                    <Button onClick={() => handleEdit(user)}>
                      <Pencil size={25} />
                    </Button>
                    <Button onClick={() => handleDelete(user)}>
                      <Trash3 size={25} />
                    </Button>
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
                  required
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
                  required
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
                required
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
