import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  //

  // useEffect(() => {
  //   if (user) {
  //     navigate("/"); // redirect on successful Login
  //   }
  // }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // form button submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const resultAction = await dispatch(login(form));

      if (login.fulfilled.match(resultAction)) {
        const { token, ...user } = resultAction.payload;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setForm({ email: "", password: "" });

        toast.success(
          resultAction.payload.message || "User logged in successfully"
        );

        navigate("/");
      } else {
        const errorMessage =
          resultAction.payload?.message ||
          "Login failed. Please check your credentials.";
        setErrors({ general: errorMessage });
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ general: "Something went wrong" });
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const inputClass = (name) =>
    `w-full border-2 rounded-lg p-2 text-sm text-black outline-none transition-all duration-200 ${
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
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {errors.general && (
          <p className="text-red-600 text-sm text-center mb-2">
            {errors.general}
          </p>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClass("email")}
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              onFocus={() => setFocused((prev) => ({ ...prev, email: true }))}
              onBlur={() => setFocused((prev) => ({ ...prev, email: false }))}
            />
            {renderError("email")}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={inputClass("password")}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              onFocus={() =>
                setFocused((prev) => ({ ...prev, password: true }))
              }
              onBlur={() =>
                setFocused((prev) => ({ ...prev, password: false }))
              }
            />
            {renderError("password")}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <p className="text-sm font-normal text-center">
            Already have an account{" "}
            <a href="/register" className="text-blue-600 font-medium">
              Sign Up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
