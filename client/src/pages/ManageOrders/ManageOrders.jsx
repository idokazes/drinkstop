import { useEffect, useState } from "react";
import { api } from "../../utilities/api";
import Accordion from "react-bootstrap/Accordion";
import "./ManageOrders.css";
import { roundTo2Digits } from "../../utilities/number-utils";
import { Avatar } from "../../components/Avatar/Avatar";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const ManageOrders = ({ products }) => {
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    api.getAllOrders().then((orders) => {
      setOrders(orders);
      console.log("orders", orders);
    });
  }, []);

  const filteredOrders = !searchValue
    ? orders
    : orders.filter((order) => {
        const lowercasedSearchValue = searchValue.toLowerCase();
        const hasProduct = order.items.find((item) => {
          return item.productId?.name
            .toLowerCase()
            .includes(lowercasedSearchValue);
        });

        return (
          hasProduct ||
          order.userId.fullName.toLowerCase().includes(lowercasedSearchValue)
        );
      });

  return (
    <div id="Orders">
      <h1>Orders</h1>
      <InputGroup>
        <Form.Control
          className="search"
          placeholder="Search by name or product..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </InputGroup>{" "}
      {filteredOrders.map((order, index) => {
        return (
          <Accordion defaultActiveKey="-1" className="bg-color" key={order._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Order #{index + 1}</Accordion.Header>
              <Accordion.Body>
                <div className="center gap-5">
                  <Avatar user={order.userId} size={50} />
                  <p className="fw-bold fs-3">{order.userId.fullName}</p>
                </div>
                {order.items.map((item, index) => {
                  const product = products.find(
                    (p) => p._id === item.productId?._id
                  );
                  if (!product) return null;

                  return (
                    <div className="row-item" key={item.productId._id + index}>
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
                      ? roundTo2Digits(
                          order.items.reduce((acc, item) => {
                            const product = products.find(
                              (product) => product._id === item.productId?._id
                            );
                            if (!product) return acc;
                            return acc + product.price * item.quantity;
                          }, 0)
                        ) + "$"
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
