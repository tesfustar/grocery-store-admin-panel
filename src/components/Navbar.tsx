import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  return (
    <div>
      Navbar
      <button onClick={logout} className="bg-main-bg p-2">
        logout
      </button>
    </div>
  );
};

export default Navbar;
