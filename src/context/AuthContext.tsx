import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AdminSideBar, StoreManagerSideBar } from "../utils/data/SidebarData";
interface Authentication {
  user: object | null;
  role: string | null;
  token: string | any;
  isAuthenticated: boolean;
}
interface AuthContextValue {
  user: any;
  token: any;
  checked: boolean;
  login: (token: string, user: object, role: string) => void;
  logout: () => void;
}
const AuthContext = createContext<Authentication | any>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [sideBarLinks, setSideBarLinks] = useState<Array<any>>([]);
  const [user, setUser] = useState<object | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const login = useCallback((token: string, role: string, user: object) => {
    if (!role) return;
    if (role == "ADMIN") {
      setSideBarLinks(AdminSideBar);
    } else if (role == "STORE_ADMIN") {
      setSideBarLinks(StoreManagerSideBar);
    }
    setToken(token);
    setUser(user);
    setRole(role);
    localStorage.setItem(
      "Grocery Store_User",
      JSON.stringify({
        token,
        role,
        user,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("Grocery Store_User");
  }, []);

  let loginData;

  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem("Grocery Store_User") || "") as any;
    const storedData: any | null = localStorage.getItem("Grocery Store_User");
    const adminData: any = JSON.parse(storedData);

    if (adminData) {
      console.log(adminData.token);
      if (adminData?.token) {
        loginData = login(adminData?.token, adminData?.role, adminData?.user);
        setChecked(true);
      }
      setChecked(true);
    }
    setChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);
  return (
    <AuthContext.Provider
      value={{ user, token, checked, login, logout, role, sideBarLinks }}
    >
      {children}
    </AuthContext.Provider>
  );
}
