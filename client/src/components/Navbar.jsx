import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items); // ✅ this is safe

  return (
    <div className="h-full w-full bg-gray-100 p-6">
      <nav className="bg-white shadow-md rounded-lg mb-6 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">🛒 E-commerce</h1>
        <ul className="flex gap-6 font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-blue-600">
              Cart ({cart.length})
            </Link>
          </li>

          <li>
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          </li>
        </ul>

        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
