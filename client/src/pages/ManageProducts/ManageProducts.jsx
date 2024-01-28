import { useState } from "react";
import { AddEditProduct } from "../../components/AddEditProduct/AddEditProduct";
import { Button } from "../../components/Button/Button";
import { api } from "../../utilities/api";
import { toastError, toastSuccess } from "../../utilities/toast";
import "./ManageProducts.css";

export const ManageProducts = ({ products, categories, fetchProducts }) => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleClose = () => setShowAddProductModal(false);
  const handleShow = () => setShowAddProductModal(true);

  const handleAdd = async () => {
    handleShow();
    setEditedProduct(null);
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
    handleShow();
  };

  const handleDelete = async (productId) => {
    try {
      const response = await api.deleteProduct(productId);
      if (response.ok) {
        toastSuccess("Product deleted successfully");
        fetchProducts();
      } else {
        const errorMessages = await response.text();
        throw new Error(errorMessages);
      }
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  return (
    <div id="ManageProducts">
      <h1>Products</h1>
      <div className="actions">
        <Button onClick={handleAdd} style={{ alignSelf: "flex-end" }}>
          Add new product
        </Button>
      </div>
      <br />
      {products.map((product) => {
        return (
          <div className="row-item" key={product._id}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Type: {product.type}</p>
            </div>
            <div>
              <p className="price">{product.price}$</p>
            </div>

            <Button onClick={() => handleEdit(product)}>Edit</Button>
            <Button onClick={() => handleDelete(product._id)}>Delete</Button>
          </div>
        );
      })}
      <div className="row-item total" style={{ display: "flex" }}>
        <div>
          <p className="total-cart"> Total Cart: $</p>
        </div>
        <Button>Checkout</Button>
      </div>
      <AddEditProduct
        fetchProducts={fetchProducts}
        categories={categories}
        show={showAddProductModal}
        handleClose={handleClose}
        editedProduct={editedProduct}
      />
    </div>
  );
};
