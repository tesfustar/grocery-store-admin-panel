import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import { ImOffice } from "react-icons/im";
import { useAuth } from "../context/AuthContext";
import { useHome } from "../context/HomeContext";
interface Props {
  isOpen?: boolean;
  isSideBarOpen?: boolean;
}
const SmallSidebar: React.FC<Props> = ({ isOpen, isSideBarOpen }) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const { sideBarLinks, logout } = useAuth();
  const { activeMenu, setActiveMenu, screenSize,isAmh } = useHome();

  const handleCloseSideBar = () => {
    if (activeMenu == true && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink = `flex items-center bg-white/10 gap-1 text-white font-light p-2 w-full px-4`;

  const normalLink = `pl-5 flex items-center  duration-500 gap-1  py-2 text-[#96a0af] dark:text-gray-200 
      hover:bg-white/10  w-full font-light `;

  const activeMenuLink = `pl-5 flex items-center  duration-500 gap-1  py-2 text-[#96a0af] dark:text-gray-200 
          bg-white/15  w-full font-light `;
  const normalMenuLink = `pl-5 flex items-center  duration-500 gap-1  py-2 text-[#96a0af] dark:text-gray-200 
          hover:bg-white/5  w-full font-light `;
  return (
    <div className="relative h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
         <div className="flex flex-col w-full">
         {sideBarLinks.map((item: any) => (
           <div className="flex flex-col items-start w-full space-y-2">
             <h1
               className={`font-normal duration-300 text-gray-300 capitalize p-2 ${
                 isSideBarOpen ? "flex" : "hidden"
               }  text-xs`}
             >
               {isAmh ? item.titleAm : item.title}
             </h1>
             {!item.hasSubMenu && (
               <NavLink
                 key={item.name}
                 to={`/${item.link}`}
                 onClick={handleCloseSideBar}
                 className={({ isActive }) =>
                   isActive ? activeLink : normalLink
                 }
               >
                 {item.icon}
                 <span
                   className={` capitalize font-medium text-sm text-gray-300`}
                 >
                   {isAmh ? item.nameAm : item.name}
                 </span>
               </NavLink>
             )}
             {item.hasSubMenu && (
               <div className="duration-300 flex flex-col items-start w-full">
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
                     <span className="text-gray-300 font-medium text-sm">
                         {item.name}
                       </span>
                   </div>
                   {isMenuOpened ? item.iconOpened : item.iconClosed}
                 </div>
                 {isMenuOpened &&
                   selectedMenu == item.id &&
                   item.menus?.map((item: any) => (
                     <NavLink
                       key={item.name}
                       to={`/${item.link}`}
                       onClick={handleCloseSideBar}
                       className={({ isActive }) =>
                         isActive ? activeMenuLink : normalMenuLink
                       }
                     >
                       {item.icon}
                       <span
                         className={`capitalize font-medium text-sm`}
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
      )}
    </div>
  );
};

export default SmallSidebar;
