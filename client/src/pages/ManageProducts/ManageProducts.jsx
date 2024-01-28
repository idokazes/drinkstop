import { useState } from "react";
import { AddEditProduct } from "../../components/AddEditProduct/AddEditProduct";
import { Button } from "../../components/Button/Button";
import { api } from "../../utilities/api";
import { toastSuccess } from "../../utilities/toast";
import "./ManageProducts.css";

export const ManageProducts = ({ products, categories }) => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const handleClose = () => setShowAddProductModal(false);
  const handleShow = () => setShowAddProductModal(true);

  return (
    <div id="ManageProducts">
      <h1>Products</h1>
      <div className="actions">
        <Button onClick={handleShow} style={{ alignSelf: "flex-end" }}>
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

            <Button>Edit</Button>
            <Button>Delete</Button>
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
        categories={categories}
        show={showAddProductModal}
        handleClose={handleClose}
      />
    </div>
  );
};
