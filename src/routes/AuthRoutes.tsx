import React, { useState, useEffect } from "react";
import { Sidebar, NavBar } from "../components";
import { useAuth } from "../context/AuthContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useHome } from "../context/HomeContext";
import SmallSidebar from "../components/SmallSidebar";
import { AdminRoute } from "./routes";
import Logo from "../assets/Logo.png";
import { GiGamepadCross } from "react-icons/gi";
const AuthRoutes = () => {
  const { sideBar, role } = useAuth();
  const {
    setIsSideBarOpen,
    isSideBarOpen,
    setIsOpen,
    isOpen,
    isSmallScreen,
    activeMenu,
  } = useHome();
  return (
    <div className="flex relative min-h-screen w-full">
      {!isSmallScreen ? (
        <div
          className={`bg-[#141423]  h-screen  duration-300 
    ${
      isOpen ? "w-0 hidden" : isSideBarOpen ? "w-64" : "w-20"
    }  fixed overflow-y-scroll scrollbar-hide overflow-x-hidden `}
        >
          <div className=" flex items-center justify-center space-x-2 p-3">
            <GiGamepadCross className="text-main-color text-4xl" />
            {isSideBarOpen && (
              <h1 className=" text-white duration-500 font-bold text-xl">
                GROCERY STORE
              </h1>
            )}
          </div>
          {!isSmallScreen && <Sidebar />}
        </div>
      ) : (
        <div
          className={`overflow-y-scroll scrollbar-hide  ${
            activeMenu
              ? "transition ease-out max-w-[260px] z-50"
              : "transition ease-out max-w-0"
          } w-full  h-screen bg-stone-900 fixed`}
        >
          <SmallSidebar />
        </div>
      )}
      <div
        className={` duration-300 overflow-x-hidden ${
          !isSmallScreen &&
          (isOpen ? "ml-0" : isSideBarOpen ? "ml-64" : " ml-20")
        }  w-full  `}
      >
        <NavBar />
        <div className="w-full p-3">
          <AdminRoute />
        </div>
      </div>
    </div>
  );
};

export default AuthRoutes;
