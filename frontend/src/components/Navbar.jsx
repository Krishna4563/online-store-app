import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginDetail = location.state?.loginDetail || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center p-4 md:p-6 fixed w-screen  md:w-full z-10 bg-black top-0 left-0">
      <p className="text-white">
        User: <span className="text-cyan-300">{loginDetail}</span>
      </p>
      <button
        onClick={handleCart}
        className="w-32 bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 font-bold"
      >
        My Cart
      </button>
      <button
        onClick={handleLogout}
        className="w-32 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
