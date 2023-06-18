import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user, token } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const {
    setIsSideBarOpen,
    setActiveMenu,
    isSideBarOpen,
    isOpen,
    setIsOpen,
    isSmallScreen,
    isAmh,
    setIsAmh,
    notificationStatus
  } = useHome();
  const handleNav = () => {
    setIsOpen(!isOpen);
  };
  const toggleActiveMenu = () => {
    setActiveMenu((prevActiveMenu: boolean) => !prevActiveMenu);
  };

  // notification data
  const adminNotifications = useQuery(
    ["notificationDataApi",notificationStatus],
    async () =>
      await axios.get(
        user.role === "ADMIN" ? 
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}notification/admin` :
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}notification/branch/${user.branch}`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
    }
  );
  function DropDown() {
    return (
      <div className=" flex items-end justify-end z-40">
        <Menu as="div" className="relative inline-block text-left z-30">
          <div>
            <Menu.Button className="inline-flex w-full justify-center ">
              <div className="flex items-center space-x-1 z-20">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {user.firstName + " " + user.lastName}
                  </p>
                  <span className="text-gray-500 text-sm">{user.phone}</span>
                </div>
                <img src={user.profile} alt="" className="h-12 rounded-full " />
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute z-50 right-0 mt-2 py-2 w-56 origin-top-right flex flex-col items-start
             rounded-md bg-white dark:bg-secondary-dark-bg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <span className="capitalize font-medium text-sm p-2">
                {isAmh ? "ቋንቋ" : "Language"}
              </span>
              <div className="p-3 grid grid-cols-2 gap-2 w-full">
                <Menu.Item>
                  <span
                    onClick={() => setIsAmh(false)}
                    className={`capitalize font-medium w-full text-sm ${
                      isAmh ? "text-gray-500" : "text-main-color"
                    }  cursor-pointer`}
                  >
                    English
                  </span>
                </Menu.Item>
                <Menu.Item>
                  <span
                    onClick={() => setIsAmh(true)}
                    className={`capitalize font-medium w-full text-sm  ${
                      isAmh ? "text-main-color" : "text-gray-500"
                    }  cursor-pointer`}
                  >
                    አማርኛ
                  </span>
                </Menu.Item>
              </div>
              <span className="capitalize font-medium text-sm p-2">
                {isAmh ? "መገለጫ" : "Profile"}
              </span>
              <div className="pt-1 flex flex-col items-start space-y-1 w-full">
                <Menu.Item>
                  <div className="flex items-center space-x-2 p-2 pl-3 w-full hover:bg-main-bg/10  cursor-pointer">
                    <FaUserAlt size={13} className="text-main-color" />
                    <span
                      className={`capitalize font-medium text-sm text-gray-500`}
                      onClick={logout}
                    >
                      {isAmh ? "መገለጫ" : "Profile"}
                    </span>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="flex items-center space-x-2 p-2 pl-3 w-full hover:bg-main-bg/10  cursor-pointer">
                    <FiLogOut size={13} className="text-main-color" />
                    <span
                      className={`capitalize font-medium text-sm text-gray-500`}
                      onClick={logout}
                    >
                      {isAmh ? "ውጣ" : "Log Out"}
                    </span>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-md w-full  p-3 flex items-center justify-between md:px-5">
      <div>
        {isSmallScreen && !isOpen ? (
          <HiMenuAlt1
            size={18}
            className="dark:text-white text-dark-gray cursor-pointer"
            onClick={isSmallScreen ? toggleActiveMenu : handleNav}
          />
        ) : (
          <HiMenuAlt1
            size={18}
            className="dark:text-white text-dark-gray cursor-pointer"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        )}
      </div>
      <div className="flex items-center space-x-2 pr-5">
        <div
          className="relative cursor-pointer "
          onClick={() => navigate("/notifications")}
        >
          <MdNotifications
            size={25}
            className="text-dark-gray dark:text-white"
          />
          {adminNotifications?.data?.data?.count > 0 && (
            <span
              className="absolute -top-2 -right-1 text-[13px] font-medium border-2 border-[#edf2f6] dark:border-[#111114]
             text-white w-[20px] h-[20px] rounded-full bg-red-500 
             flex items-center justify-center text-center"
            >
              {adminNotifications?.data?.data?.count}
            </span>
          )}
        </div>
        <DropDown />
      </div>
    </div>
  );
};

export default Navbar;
