import "./ProductsGrid.css";
import Button from "react-bootstrap/Button";

export const ProductsGrid = ({ products }) => {
  return (
    <div id="ProductsGrid">
      {products.map((product) => (
        <div className="grid-item" key={product.id}>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}$</p>
          <Button variant="dark" size="lg">
            Add to cart
          </Button>
        </div>
      ))}
    </div>
  );
};
