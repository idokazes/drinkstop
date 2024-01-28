import { Button } from "../Button/Button";
import "./ProductsGrid.css";

export const ProductsGrid = ({ products, addToCart }) => {
  return (
    <div id="ProductsGrid">
      {products.map((product) => (
        <div key={product._id} className="grid-item">
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price}$</p>
          <Button onClick={() => addToCart(product._id)}>Add to cart</Button>
        </div>
      ))}
    </div>
  );
};
