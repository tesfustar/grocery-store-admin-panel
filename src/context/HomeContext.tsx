import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { IToast } from "../types/Toast";

const HomeContext = createContext<any>(undefined);

export function useHome() {
  return useContext(HomeContext);
}

export default function HomeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  //for toast notification
  const [messageType, setMessageType] = useState<IToast | null>(null);

  //language
  const [isAmh, setIsAmh] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
      setIsSmallScreen(true);
      setIsOpen(false);
    } else {
      setActiveMenu(true);
      setIsSmallScreen(false);
    }
  }, [screenSize]);
  return (
    <HomeContext.Provider
      value={{
        setIsSideBarOpen,
        isSideBarOpen,
        setIsOpen,
        isOpen,
        isSmallScreen,
        activeMenu,
        setActiveMenu,
        screenSize,
        messageType,
        setMessageType,
        isAmh,
        setIsAmh,
        confirmModalOpen,
        setConfirmModalOpen,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
