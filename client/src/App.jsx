import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard";
import ProductList from "./pages/products/ProductList";
import Cart from "./pages/cart";
import ProductDetails from "./pages/products/ProductDetails";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/cart/Checkout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
