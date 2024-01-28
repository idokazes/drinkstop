import { Button } from "../Button/Button";
import "./ProductsRows.css";

export const ProductsRows = ({ products, addToCart }) => {
  return (
    <div id="ProductsRows">
      {products.map((product) => (
        <div className="row-item" key={product.id}>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          <div className="product-details">
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p>Type: {product.type}</p>
            <p>Alcohol Percentage: {product.alcoholPercentage}</p>
          </div>
          <div>
            <p className="price">{product.price}$</p>
            <Button onClick={() => addToCart(product._id)}>Add to cart</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
