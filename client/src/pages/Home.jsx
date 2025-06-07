import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-4 shadow flex justify-between w-full">
        <h1 className="text-xl font-bold">Simple Auth</h1>

        {/* Navigate to Register or Login page */}
        <div className="flex space-x-4">
          <button
            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-full shadow border border-blue-400 text-blue-400"
            onClick={() => navigate("/Register")}
          >
            Register
          </button>
          <button
            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-full shadow bg-blue-400 text-white"
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
