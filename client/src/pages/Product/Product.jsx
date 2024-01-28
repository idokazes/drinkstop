import { useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import "./Product.css";

export const Product = ({ products, addToCart }) => {
  const { id } = useParams();

  const product = products.find((product) => product._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div id="Product">
      <h1>{product.name}</h1>
      <div className="container bg-color  pl-5" key={product.id}>
        <div className="d-flex align-items-center justify-content-center">
          <div className="product-details ">
            <div className="details">
              <p className="product-description">{product.description}</p>
              <p>Type: {product.type}</p>
              <p>Alcohol Percentage: {product.alcoholPercentage}</p>
              <p className="price">{product.price}$</p>
              <br />
              <Button onClick={() => addToCart(product._id)}>
                Add to cart
              </Button>
            </div>
          </div>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};
