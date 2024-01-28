import { Button } from "../../components/Button/Button";
import { api } from "../../utilities/api";
import { toastSuccess } from "../../utilities/toast";
import "./Cart.css";

export const Cart = ({ cart, products, removeFromCart, setCart }) => {
  const totalCart = products.length
    ? cart.reduce((acc, item) => {
        const product = products.find(
          (product) => product._id === item.productId
        );
        return acc + product.price * item.quantity;
      }, 0)
    : "loading...";

  const handleCheckout = async () => {
    const result = await api.checkout(cart);
    if (result.ok) {
      toastSuccess("Successfully checked out.");
      setCart([]);
    }
  };
  return (
    <div id="Cart">
      <h1>Cart</h1>
      {cart.map(({ productId, quantity }) => {
        const product = products.find((product) => product._id === productId);
        if (!product) return null;
        return (
          <div className="row-item" key={productId}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Type: {product.type}</p>
            </div>
            <div style={{ width: "250px" }}>
              <div style={{ display: "flex" }}>
                <div>
                  <p className="price">
                    {product.price}$ x {quantity}
                  </p>
                </div>
                <div>
                  <p className="price"> = {product.price * quantity}$</p>
                </div>
              </div>
              <Button onClick={() => removeFromCart(product._id)}>
                Delete
              </Button>
            </div>
          </div>
        );
      })}
      <div className="row-item total" style={{ display: "flex" }}>
        <div>
          <p className="total-cart"> Total Cart: {totalCart}$</p>
        </div>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
};
