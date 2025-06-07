import React, { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  const [view, setView] = useState("register");

  return (
    <>
      <div className="p-4 shadow flex justify-between w-full">
        <h1 className="text-xl font-bold">Simple Auth</h1>


        {/* button for register and login */}
        <div className="flex space-x-4">
          <button
            className="cursur-pointer px-4 py-2 text-sm font-medium rounded-full shadow border border-blue-400 text-blue-400 "
            onClick={() => setView("register")}
          >
            Register
          </button>
          <button
            className="cursur-pointer px-4 py-2 text-sm font-medium rounded-full shadow bg-blue-400 text-white"
            onClick={() => setView("login")}
          >
            Login
          </button>
        </div>
      </div>

      {/* to view any auth page thats is clicked */}
      {view === "register" ? <Register /> : <Login />}
    </>
  );
}
