import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home.1";
import { About } from "./pages/About/About";
import { Footer } from "./components/Footer/Footer";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { BASE_URL, JWT_TOKEN_KEY } from "./constants";
import { Cart } from "./pages/Cart/Cart";
import { api } from "./utilities/api";
import { Orders } from "./pages/Orders/Orders";
import { toastError } from "./utilities/toast";
import { ManageUsers } from "./pages/ManageUsers/ManageUsers";
import { ManageProducts } from "./pages/ManageProducts/ManageProducts";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const categories = [...new Set(products.map((product) => product.type))];

  useEffect(() => {
    fetch(BASE_URL + "/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (productId) => {
    if (!user) {
      return toastError("Please login to add to cart.");
    }
    const itemInCart = cart.find((item) => item.productId === productId);
    let updatedCart;
    if (itemInCart) {
      updatedCart = cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { productId, quantity: 1 }];
    }

    api.saveCart(updatedCart);
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    api.saveCart(updatedCart);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem(JWT_TOKEN_KEY);
    if (jwtToken) {
      fetch(BASE_URL + "/users/refresh", {
        headers: {
          Authorization: jwtToken,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Authentication failed.");
        })
        .then((data) => {
          localStorage.setItem(JWT_TOKEN_KEY, data.jwtToken);
          setUser(data);
          setCart(data.cart);
        })
        .catch((error) => {
          console.error(error);
          setUser(null);
          localStorage.removeItem(JWT_TOKEN_KEY);
        });
    }
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                categories={categories}
                products={products}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route
            path="/manage-products"
            element={
              <ManageProducts products={products} categories={categories} />
            }
          />
          <Route path="/orders" element={<Orders products={products} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                products={products}
                removeFromCart={removeFromCart}
                setCart={setCart}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
