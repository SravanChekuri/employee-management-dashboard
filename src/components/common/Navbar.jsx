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
        <div className="md:hidden mt-4 flex flex-col gap-3 items-center ">
          <span className="text-sm text-white">admin@test.com</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md max-w-[100px]"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
