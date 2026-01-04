import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuth } = useAuth();

  const handleLogin = () => {
    login();
    navigate("/dashboard", { replace: true });
  };

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
