import React from "react";
import { NavLink } from "react-router-dom";
import { ImOffice } from "react-icons/im";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";
interface Props {
  isOpen?: boolean;
  isSideBarOpen?: boolean;
}
const SmallSidebar: React.FC<Props> = ({ isOpen, isSideBarOpen }) => {
  const { sideBarLinks, logout } = useAuth();
  const { activeMenu, setActiveMenu, screenSize } = useHome();

  const handleCloseSideBar = () => {
    if (activeMenu == true && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 rounded-lg bg-blue-bg text-white font-medium m-2 pb-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 rounded-lg text-gray-700  duration-700 dark:text-gray-200 hover:text-main-color  m-2  font-medium m-2 pb-2";

  return (
    <div className="ml-3 relative h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
    {activeMenu && (
      <>
        <div className="mt-10 ">
          <div className="">
            {sideBarLinks.map((item:any) => (
              <div key={item.title}>
                <h1 className="font-medium text-[#96a0af] dark:text-gray-300 text-sm">
                  {item.title}
                </h1>
                {item.links.map((link:any) => (
                  <NavLink
                    key={link.name}
                    to={`/${link.link}`}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize font-medium text-sm">
                      {link.name} 
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
         
    
        </div>
      </>
    )}
  </div>
  );
};

export default SmallSidebar;
