import React from "react";
import { addItem, removeItem } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Hero = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="min-h-full bg-gray-100 p-6">
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

export default Hero;
