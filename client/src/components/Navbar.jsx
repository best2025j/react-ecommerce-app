import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem, removeItem } from "../features/cart/cartSlice";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.items);
    const navigate = useNavigate();
  
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <button
            onClick={() =>
              dispatch(addItem({ id: Date.now(), name: "Sample Product" }))
            }
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          >
            Add Sample Product
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
          <ul className="space-y-2">
            {cart.length === 0 ? (
              <p className="text-gray-500">No items in cart.</p>
            ) : (
              cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded border"
                >
                  <span>{item.name}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
