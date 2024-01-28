const { BASE_URL, JWT_TOKEN_KEY } = require("../constants");

const getJwtToken = () => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  if (!token) {
    throw new Error("Your token has expired, please login");
  }
  return token;
};

const saveCart = (cart) => {
  fetch(BASE_URL + "/users/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getJwtToken(),
    },
    body: JSON.stringify(cart),
  });
};

const checkout = (cart) => {
  return fetch(BASE_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getJwtToken(),
    },
    body: JSON.stringify(cart),
  });
};

const getOrders = () => {
  return fetch(BASE_URL + "/orders", {
    headers: {
      authorization: getJwtToken(),
    },
  }).then((res) => res.json());
};

const addProduct = (product) => {
  return fetch(BASE_URL + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getJwtToken(),
    },
    body: JSON.stringify(product),
  });
};

const editProduct = (productId, data) => {
  return fetch(BASE_URL + "/products/" + productId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: getJwtToken(),
    },
    body: JSON.stringify(data),
  });
};

const deleteProduct = (productId) => {
  return fetch(BASE_URL + "/products/" + productId, {
    method: "DELETE",
    headers: {
      authorization: getJwtToken(),
    },
  });
};

const getUsers = () => {
  return fetch(BASE_URL + "/users", {
    headers: {
      authorization: getJwtToken(),
    },
  });
};

const updateUsers = (userId, data) => {
  return fetch(BASE_URL + "/users/" + userId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: getJwtToken(),
    },
    body: JSON.stringify(data),
  });
};

const deleteUser = (userId) => {
  return fetch(BASE_URL + "/users/" + userId, {
    method: "DELETE",
    headers: {
      authorization: getJwtToken(),
    },
  });
};

export const api = {
  saveCart,
  checkout,
  getOrders,
  addProduct,
  editProduct,
  deleteProduct,
  getUsers,
  updateUsers,
  deleteUser,
};
