import React from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";

const Navbar = () => {
  const { logout } = useAuth();
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    isOpen,
    setIsOpen,
    isSmallScreen,
  } = useHome();
  const handleNav = () => {
    setIsOpen(!isOpen);
  };
  const toggleActiveMenu = () => {
    setActiveMenu((prevActiveMenu: boolean) => !prevActiveMenu);
  };
  console.log(activeMenu)
  return (
    <div>
      Navbar
      {isSmallScreen && !isOpen && (
        <FaBars
          size={18}
          className="dark:text-white text-dark-gray cursor-pointer"
          onClick={isSmallScreen ? toggleActiveMenu : handleNav}
        />
      )}
      <button onClick={logout} className="bg-main-bg p-2">
        logout
      </button>
    </div>
  );
};

export default Navbar;
