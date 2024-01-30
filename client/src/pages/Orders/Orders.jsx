import { useEffect, useState } from "react";
import { api } from "../../utilities/api";
import Accordion from "react-bootstrap/Accordion";
import "./Orders.css";

export const Orders = ({ products }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.getOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  return (
    <div id="Orders">
      <h1>Orders</h1>

      {orders.map((order, index) => {
        return (
          <Accordion defaultActiveKey="-1" className="bg-color" key={order._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Order #{index + 1}</Accordion.Header>
              <Accordion.Body>
                {order.items.map((item, index) => {
                  const product = products.find(
                    (p) => p._id === item.productId
                  );
                  if (!product) return null;

                  return (
                    <div className="row-item" key={item.productId + index}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="product-details">
                        <h3>{product.name}</h3>
                        <p>Type: {product.type}</p>
                      </div>
                      <div
                        className="price-container"
                        style={{ width: "250px" }}
                      >
                        <p className="price">
                          {product.price}$ x {item.quantity} ={" "}
                          {product.price * item.quantity}$
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="total">
                  <div>Total</div>
                  <div>
                    {products.length
                      ? order.items.reduce((acc, item) => {
                          const product = products.find(
                            (product) => product._id === item.productId
                          );
                          return acc + product.price * item.quantity;
                        }, 0) + "$"
                      : "loading..."}
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
};
