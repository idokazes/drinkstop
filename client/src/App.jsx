import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
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
import { toastError, toastSuccess } from "./utilities/toast";
import { ManageUsers } from "./pages/ManageUsers/ManageUsers";
import { ManageProducts } from "./pages/ManageProducts/ManageProducts";
import { AgeModal } from "./components/AgeModal/AgeModal";
import { Product } from "./pages/Product/Product";
import { Profile } from "./pages/Profile/Profile";

const FOUR_HOURS = 4 * 60 * 60 * 1000;

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const categories = [...new Set(products.map((product) => product.type))];
  const navigate = useNavigate();

  const isAdmin = user && user.role === "admin";

  function fetchProducts() {
    fetch(BASE_URL + "/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleUsageTimeout = () => {
      if (user) {
        setUser(null);
        localStorage.removeItem(JWT_TOKEN_KEY);
        navigate("/login");
        toastError(
          "You have been logged out due to inactivity. Please login again"
        );
      }
    };

    let timerId = setTimeout(handleUsageTimeout, FOUR_HOURS);
    const handleClick = () => {
      clearTimeout(timerId);
      timerId = setTimeout(handleUsageTimeout, FOUR_HOURS);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      clearTimeout(timerId);
    };
  }, [user, navigate]);

  const addToCart = (productId) => {
    if (!user) {
      return toastError("Please login to add to cart.");
    }
    const product = products.find((product) => product._id === productId);
    if (product.stock === 0) {
      return toastError("This product is out of stock.");
    }

    const itemInCart = cart.find((item) => item.productId === productId);
    let updatedCart;

    let isNotEnoughStock = false;
    if (itemInCart) {
      updatedCart = cart.map((item) => {
        const newQuantity = item.quantity + 1;
        if (newQuantity > product.stock) {
          isNotEnoughStock = true;
        }
        return item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    } else {
      updatedCart = [...cart, { productId, quantity: 1 }];
    }

    if (isNotEnoughStock) return toastError("Not enough stock.");

    api.saveCart(updatedCart);
    setCart(updatedCart);
    toastSuccess("Added to cart.");
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    api.saveCart(updatedCart);
    toastSuccess("Removed from cart.");
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
          } else if (response.status === 401) {
            throw new Error("Authentication failed.");
          }
        })
        .then((data) => {
          localStorage.setItem(JWT_TOKEN_KEY, data.jwtToken);
          setUser(data);
          setCart(data.cart);
        })
        .catch((error) => {
          console.error(error);
          if (error.message === "Authentication failed.") {
            setUser(null);
            localStorage.removeItem(JWT_TOKEN_KEY);
          }
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
          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/product/:id"
            element={<Product products={products} addToCart={addToCart} />}
          />
          {isAdmin && (
            <>
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route
                path="/manage-products"
                element={
                  <ManageProducts
                    products={products}
                    categories={categories}
                    fetchProducts={fetchProducts}
                  />
                }
              />
            </>
          )}
          <Route path="/orders" element={<Orders products={products} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                products={products}
                removeFromCart={removeFromCart}
                setCart={setCart}
                fetchProducts={fetchProducts}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
      <AgeModal />
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
