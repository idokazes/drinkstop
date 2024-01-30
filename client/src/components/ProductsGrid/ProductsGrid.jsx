import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./ProductsGrid.css";
import { CartPlus, InfoCircle } from "react-bootstrap-icons";

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
          <div className="product-price">{product.price}$</div>
          <div className="d-flex justify-content-between">
            <Button onClick={() => addToCart(product._id)}>
              Add to cart <CartPlus size={25} />
            </Button>
            <Link to={`/product/${product._id}`}>
              <Button>
                <InfoCircle size={25} />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
