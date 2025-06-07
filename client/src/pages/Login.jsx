import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../features/auth/authSlice"; // Your redux async thunk for login

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const dispatch = useDispatch(); // Redux function used to send actions to the Redux store to update the state
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect if logged in
    }
  }, [user, navigate]);

  //  function updates your form state whenever the user types into an input field
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // validate if the email or password not filled
  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); //Stops the page from refreshing.

    // Validate before dispatch
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // dispatch login action (async thunk)
      const resultAction = await dispatch(login(form));

      if (login.fulfilled.match(resultAction)) {
        const { token, user } = resultAction.payload;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // redirect after login
      } else {
        setErrors({ general: resultAction.payload || "Login failed" });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong" });
    }
  };

  // form focus when ever any form filed is clicked
  const inputClass = (name) =>
    `w-full border-2 rounded-lg p-2 text-sm outline-none transition-all duration-200 ${
      errors[name]
        ? "border-red-500"
        : focused[name]
        ? "border-blue-500 shadow-md"
        : "border-gray-300"
    }`;

  // error handler if non of the field are clicked when the submit button is clicked
  const renderError = (field) =>
    errors[field] && (
      <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    );

  return (
    <div className="md:h-[900px] flex justify-center w-full items-center mx-auto">
      <div className="bg-white max-w-md flex flex-col space-y-2 justify-center w-full items-center mx-auto mt-10 p-6 rounded-xl shadow-lg">
        <h1 className="font-bold text-2xl">Login</h1>

        {errors.general && (
          <p className="text-red-600 text-sm text-center">{errors.general}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-2 mt-6"
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              className={inputClass("email")}
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              // onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused({ ...focused, email: true })}
              onBlur={() => setFocused({ ...focused, email: false })}
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

          {/* Submit */}
          <div className="pt-4">
            <button
              className="p-2 bg-blue-400 text-white w-full font-bold text-sm rounded-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
