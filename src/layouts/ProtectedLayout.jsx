import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const ProtectedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
