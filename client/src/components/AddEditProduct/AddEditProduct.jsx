import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CategoriesSelect } from "../CategoriesSelect/CategoriesSelect";
import { useState } from "react";

export function AddEditProduct({ show, handleClose, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // handleClose();
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose} centered={true} backdrop={true}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add new product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control type="text" placeholder="name" name="name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product price</Form.Label>
              <Form.Control
                type="number"
                placeholder="price"
                min={1}
                name="price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="http://..." name="image" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                name="description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alcohol percentage</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.7%"
                min={0}
                name="alcoholPercentage"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Volume (ml)</Form.Label>
              <Form.Control
                type="number"
                placeholder="700"
                min={0}
                name="volume"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                min={0}
                name="stock"
              />
            </Form.Group>

            <CategoriesSelect
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
// name: {
//     type: String,
//     required: true,
//   },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
//   description: { type: String, required: true },
//   alcoholPercentage: { type: Number, required: true },
//   volume: { type: Number, required: true },
//   stock: { type: Number, required: true, default: 100 },
//   type: {
//     type: String,
//     required: true,
//     enum: [
//       "Beer",
//       "Wine",
//       "Whiskey",
//       "Gin",
//       "Vodka",
//       "Rum",
//       "Tequila",
//       "Other",
//     ],
//   },
