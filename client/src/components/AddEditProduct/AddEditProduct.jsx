import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CategoriesSelect } from "../CategoriesSelect/CategoriesSelect";
import { useEffect, useState } from "react";
import { api } from "../../utilities/api";
import { toastError, toastSuccess } from "../../utilities/toast";

export function AddEditProduct({
  show,
  handleClose,
  categories,
  fetchProducts,
  editedProduct,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [volume, setVolume] = useState("");
  const [alcoholPercentage, setAlcoholPercentage] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editedProduct) {
      setName(editedProduct.name);
      setStock(editedProduct.stock);
      setVolume(editedProduct.volume);
      setAlcoholPercentage(editedProduct.alcoholPercentage);
      setDescription(editedProduct.description);
      setImage(editedProduct.image);
      setPrice(editedProduct.price);
      setSelectedCategory(editedProduct.type);
    } else {
      setName("");
      setStock("");
      setVolume("");
      setAlcoholPercentage("");
      setDescription("");
      setImage("");
      setPrice("");
      setSelectedCategory("");
    }
  }, [editedProduct]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.type = selectedCategory;

    try {
      const response = await (editedProduct
        ? api.editProduct(editedProduct._id, data)
        : api.addProduct(data));

      if (response.ok) {
        toastSuccess(
          `Product ${editedProduct ? "edited" : "added"} successfully`
        );
        fetchProducts();
        handleClose();
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }

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
            <Modal.Title>
              {editedProduct ? "Edit product" : "Add new product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product price</Form.Label>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="price"
                min={1}
                step={0.01}
                name="price"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="http://..."
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alcohol percentage</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.7%"
                min={0}
                step={0.01}
                name="alcoholPercentage"
                value={alcoholPercentage}
                onChange={(e) => setAlcoholPercentage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Volume (ml)</Form.Label>
              <Form.Control
                type="number"
                placeholder="700"
                min={0}
                name="volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                min={0}
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Form.Group>

            <CategoriesSelect
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editedProduct ? "Edit" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
