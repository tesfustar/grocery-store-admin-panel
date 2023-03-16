import React, { useState, useEffect } from "react";
import { Sidebar, NavBar } from "../components";
import { useAuth } from "../context/AuthContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useHome } from "../context/HomeContext";
import SmallSidebar from "../components/SmallSidebar";
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
    <div className="flex relative min-h-screen">
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
          {!isSmallScreen && (
            <Sidebar isOpen={isOpen} isSideBarOpen={isSideBarOpen} />
          )}
        </div>
      ) : (
        <div className="w-20">
          <SmallSidebar />
        </div>
      )}
      <div
        className={` duration-300  ${
          isOpen ? "ml-0" : isSideBarOpen ? "ml-64" : " ml-20"
        }  w-full  p-3  `}
      >
        <input type="text" className="bg-gray-300 p-2" />
      </div>
    </div>
  );
};

export default AuthRoutes;
