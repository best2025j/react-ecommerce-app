import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <Navbar />
      <Hero />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Welcome to Simple Auth Shop 🛍️
          </h1>
          <p className="text-gray-600 mb-6">
            Your simple e-commerce platform with authentication.
          </p>

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
        </div>
      </div>
    </div>
  );
};

export default Home;
