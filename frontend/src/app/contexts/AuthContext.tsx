import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiLogin, apiRegister } from "../api";

interface User {
  id:    string;
  name:  string;
  email: string;
}

interface AuthContextType {
  user:            User | null;
  token:           string | null;
  isAuthenticated: boolean;
  login:           (email: string, password: string) => Promise<void>;
  register:        (name: string, email: string, password: string) => Promise<void>;
  logout:          () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,  setUser]  = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser  = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiLogin(email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user",  JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    await apiRegister(name, email, password);
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}