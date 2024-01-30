import { useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import "./Product.css";
import { CartPlus } from "react-bootstrap-icons";

export const Product = ({ products, addToCart }) => {
  const { id } = useParams();

  const product = products.find((product) => product._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div id="Product">
      <h1>{product.name}</h1>
      <div className="container bg-color pl-5 py-5" key={product.id}>
        <div
          style={{ gap: "100px" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="product-details">
            <div className="details">
              <p className="product-description">{product.description}</p>
              <div className="product-info">
                <p>
                  <span>Type:</span> {product.type}
                </p>
                <p>
                  <span>Alcohol Percentage:</span> {product.alcoholPercentage}%
                </p>
                <p className="price">
                  <span>Price:</span> {product.price}$
                </p>
                <p className="price">
                  <span>Stock:</span> {product.stock}
                </p>
              </div>
              <br />
              <Button onClick={() => addToCart(product._id)}>
                Add to cart <CartPlus size={25} />
              </Button>
            </div>
          </div>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};
