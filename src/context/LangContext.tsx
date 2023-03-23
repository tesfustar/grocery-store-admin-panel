import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const LangContext = createContext<any>(undefined);
export const useLang = () => useContext(LangContext);

export default function LangProvider({ children }: any) {
  const [isAmh, setIsAmh] = useState<boolean>(false);
  const changeLang = useCallback(() => {
    setIsAmh(!isAmh);
  }, [isAmh]);
  return (
    <LangContext.Provider value={{ isAmh, changeLang }}>
      {children}
    </LangContext.Provider>
  );
}
