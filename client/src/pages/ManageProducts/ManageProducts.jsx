import { useState } from "react";
import { AddEditProduct } from "../../components/AddEditProduct/AddEditProduct";
import { Button } from "../../components/Button/Button";
import { api } from "../../utilities/api";
import { toastError, toastSuccess } from "../../utilities/toast";
import "./ManageProducts.css";
import { Pencil, PlusCircle, Trash3 } from "react-bootstrap-icons";

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
        <Button onClick={handleAdd} className="add-button">
          <PlusCircle size={25} />
          <span style={{ width: "10px", display: "inline-block" }}> </span> Add
          new product
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
            <div className="item-actions">
              <Button onClick={() => handleEdit(product)}>
                <Pencil size={25} />
              </Button>
              <Button onClick={() => handleDelete(product._id)}>
                <Trash3 size={25} />
              </Button>
            </div>
          </div>
        );
      })}

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
