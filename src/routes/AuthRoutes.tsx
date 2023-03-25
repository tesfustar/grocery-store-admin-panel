import React, { useState, useEffect } from "react";
import { Sidebar, NavBar } from "../components";
import { useAuth } from "../context/AuthContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useHome } from "../context/HomeContext";
import SmallSidebar from "../components/SmallSidebar";
import Category from "../pages/category/Category";
import { AdminRoute } from "./routes";
import Logo from "../assets/Logo.png";
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
          className={`bg-stone-900  h-screen pt-5 duration-300
    ${isOpen ? "w-0 hidden" : isSideBarOpen ? "w-64" : "w-20"} p-5 fixed `}
        >
          <BsFillArrowLeftCircleFill
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className={`text-main-color absolute duration-500 -right-3 top-9 text-3xl ${
              !isSideBarOpen && "rotate-180"
            }`}
          />
          <div className=" flex items-center space-x-2">
            <BsFillArrowLeftCircleFill className="text-main-color text-4xl" />
            {isSideBarOpen && (
              <h1 className="origin-left text-white duration-500 font-bold text-xl">
                e-shope
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
        }  w-full  p-3  `}
      >
        <NavBar />

        <AdminRoute />
      </div>
    </div>
  );
};

export default AuthRoutes;
