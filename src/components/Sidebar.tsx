import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ImOffice } from "react-icons/im";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";
const Sidebar: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const { sideBarLinks, logout } = useAuth();
  const { isOpen, isSideBarOpen, isAmh } = useHome();
  const activeLink = `flex items-center ${
    !isSideBarOpen && "justify-center"
  } bg-white/10 gap-1 text-white font-light p-2 w-full px-4`;

  const normalLink = `flex items-center   gap-1 ${
    isSideBarOpen ? "px-4" : "justify-center "
  } py-2 text-[#96a0af] dark:text-gray-200 
      hover:bg-white/10  w-full font-light `;

  const activeMenuLink = `flex items-center   gap-1 ${
    isSideBarOpen ? "px-8 " : "justify-center "
  } py-2 text-[#96a0af] dark:text-gray-200 
          bg-white/10  w-full font-light `;
  const normalMenuLink = `flex items-center   gap-1 ${
    isSideBarOpen ? "px-8 " : "justify-center "
  } py-2 text-[#96a0af] dark:text-gray-200 
          hover:bg-white/5  w-full font-light `;
  return (
    <div className="flex flex-col items-start  w-full">
      <div className="flex flex-col w-full  ">
        {sideBarLinks.map((item: any) => (
          <div className="flex flex-col items-start w-full space-y-2">
            <h1
              className={`font-normal  text-gray-300 capitalize p-2 ${
                isSideBarOpen ? "flex" : "hidden"
              }  text-xs`}
            >
              {isAmh ? item.titleAm : item.title}
            </h1>
            {!item.hasSubMenu && (
              <NavLink
                key={item.name}
                to={`/${item.link}`}
                // onClick={handleCloseSideBar}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {item.icon}
                <span
                  className={`${
                    isSideBarOpen ? "flex" : "hidden"
                  } capitalize font-medium text-sm text-gray-300`}
                >
                  {isAmh ? item.nameAm : item.name}
                </span>
              </NavLink>
            )}
            {item.hasSubMenu && (
              <div className="duration-1000 transition ease-in-out flex flex-col items-start w-full">
                <div
                  onClick={() =>
                    selectedMenu && selectedMenu == item.id
                      ? (setIsMenuOpened(!isMenuOpened), setSelectedMenu(null))
                      : (setSelectedMenu(item.id), setIsMenuOpened(true))
                  }
                  className="flex items-center justify-between w-full py-2 hover:bg-white/5 cursor-pointer px-4"
                >
                  <div className="flex items-center space-x-2 ">
                    {item.icon}
                    {isSideBarOpen && (
                      <span className="text-gray-300 font-medium text-sm">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {(isMenuOpened && selectedMenu == item.id ) ? item.iconOpened : item.iconClosed}
                </div>
                {isMenuOpened &&
                  selectedMenu == item.id &&
                  item.menus?.map((item: any) => (
                    <NavLink
                      key={item.name}
                      to={`/${item.link}`}
                      className={({ isActive }) =>
                        isActive ? activeMenuLink : normalMenuLink
                      }
                    >
                      {item.icon}
                      <span
                        className={`${
                          isSideBarOpen ? "flex" : "hidden"
                        } capitalize font-medium text-sm`}
                      >
                        {isAmh ? item.nameAm : item.name}
                      </span>
                    </NavLink>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
