import { Button } from "../../components/Button/Button";
import { api } from "../../utilities/api";
import { toastError, toastSuccess } from "../../utilities/toast";
import "./Cart.css";

export const Cart = ({
  cart,
  products,
  removeFromCart,
  setCart,
  fetchProducts,
}) => {
  const totalCart = products.length
    ? cart.reduce((acc, item) => {
        const product = products.find(
          (product) => product._id === item.productId
        );
        if (!product) return acc;
        return acc + product.price * item.quantity;
      }, 0)
    : "loading...";

  const handleCheckout = async () => {
    try {
      const result = await api.checkout(cart);
      if (result.ok) {
        toastSuccess("Successfully checked out.");
        setCart([]);
        fetchProducts();
      } else {
        const errorMessages = await result.text();
        throw new Error(errorMessages);
      }
    } catch (error) {
      console.log(error);
      toastError(error.message);
    } finally {
      fetchProducts();
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
            <div style={{ width: "350px" }}>
              <div>
                <p className="price">
                  {product.price}$ x {quantity} = {product.price * quantity}$
                </p>
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
          <p className="total-cart"> Total Cart: {totalCart.toFixed(2)}$</p>
        </div>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
};
