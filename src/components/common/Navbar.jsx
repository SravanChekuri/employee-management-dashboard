import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Images/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f2a44]/95 backdrop-blur shadow-md px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Company Logo"
            className="h-12 w-auto max-w-[120px] max-h-[150px]"
          />
          <span className="font-semibold text-white">XYZ HR Management</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => goTo("/dashboard")}
            className="text-blue-100 hover:text-white"
          >
            Dashboard
          </button>

          <button
            onClick={() => goTo("/employees")}
            className="text-blue-100 hover:text-white"
          >
            Manage Employees
          </button>

          <span className="text-sm text-blue-100">admin@test.com</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col border-t border-white/20">
          <button
            onClick={() => goTo("/dashboard")}
            className="w-full text-left px-4 py-3 text-white font-semibold hover:bg-white/10"
          >
            Dashboard
          </button>

          <div className="border-t border-white/20" />

          <button
            onClick={() => goTo("/employees")}
            className="w-full text-left px-4 py-3 text-white font-semibold hover:bg-white/10"
          >
            Manage Employees
          </button>

          <div className="border-t border-white/20" />

          <div className="px-4 py-3 text-sm text-blue-100">admin@test.com</div>

          <div className="border-t border-white/20" />

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-300 font-semibold hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
