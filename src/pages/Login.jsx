import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockUser } from "../mocks/auth.mock";
import loginBg from "../assets/Images/Login Bacground.png";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    if (!email.trim()) newErrors.email = "*Email is required";
    if (!password.trim()) newErrors.password = "*Password is required";
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    if (email === mockUser.email && password === mockUser.password) {
      login();
      navigate("/dashboard", { replace: true });
    } else {
      setErrors({
        email: "",
        password: "*Invalid email or password",
      });
    }
  };

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat md:bg-left flex items-center justify-center md:justify-end px-4 sm:px-8 md:px-20"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8 -mt-10 md:-mt-16"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@test.com"
          />
          {errors.email && (
            <p className="text-red-500 text-s mt-1 ms-2">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin123"
          />

          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500 text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>

          {errors.password && (
            <p className="text-red-500 text-s mt-1 ms-2">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
