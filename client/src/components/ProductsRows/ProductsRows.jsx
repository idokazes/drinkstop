import "./ProductsRows.css";
import Button from "react-bootstrap/Button";

export const ProductsRows = ({ products }) => {
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
            <p>{product.description}</p>
            <p>Type: {product.type}</p>
            <p>Alcohol Percentage: {product.alcoholPercentage}</p>
          </div>
          <div>
            <p className="price">{product.price}$</p>
            <Button variant="dark" size="lg">
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
