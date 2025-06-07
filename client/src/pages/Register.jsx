import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect after successful register
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validations first
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // clear errors before dispatch
    dispatch(register(form));
  };

  const inputClass = (name) =>
    `w-full border-2 rounded-lg p-2 text-sm outline-none transition-all duration-200 ${
      errors[name]
        ? "border-red-500"
        : focused[name]
        ? "border-blue-500 shadow-md"
        : "border-gray-300"
    }`;

  const renderError = (field) =>
    errors[field] && (
      <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    );

  return (
    <div className="md:h-[900px] flex justify-center w-full items-center mx-auto">
      <div className="bg-white max-w-lg flex flex-col space-y-2 justify-center w-full items-center mx-auto mt-10 p-6 rounded-xl shadow-lg">
        <h1 className="font-bold text-2xl">Register</h1>

        {/* show general redux error from backend */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full mt-6 space-y-4"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              className={inputClass("name")}
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocused({ ...focused, name: true })}
              onBlur={() => setFocused({ ...focused, name: false })}
            />
            {renderError("name")}
          </div>

          <div className="flex space-x-2 w-full">
            {/* Email */}
            <div className="w-full">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                className={inputClass("email")}
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused({ ...focused, email: true })}
                onBlur={() => setFocused({ ...focused, email: false })}
              />
              {renderError("email")}
            </div>

            {/* Password */}
            <div className="w-full">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                className={inputClass("password")}
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocused({ ...focused, password: true })}
                onBlur={() => setFocused({ ...focused, password: false })}
              />
              {renderError("password")}
            </div>
          </div>

          {/* Submit button*/}
          <div className="py-2">
            <button
              className="p-2 bg-blue-400 text-white w-full font-bold text-sm rounded-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
