const { BASE_URL, JWT_TOKEN_KEY } = require("../constants");

const saveCart = (cart) => {
  fetch(BASE_URL + "/users/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem(JWT_TOKEN_KEY),
    },
    body: JSON.stringify(cart),
  });
};

const checkout = (cart) => {
  return fetch(BASE_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem(JWT_TOKEN_KEY),
    },
    body: JSON.stringify(cart),
  });
};

const getOrders = () => {
  return fetch(BASE_URL + "/orders", {
    headers: {
      authorization: localStorage.getItem(JWT_TOKEN_KEY),
    },
  }).then((res) => res.json());
};

export const api = { saveCart, checkout, getOrders };
