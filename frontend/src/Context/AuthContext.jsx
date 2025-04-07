import { useContext, useState, useEffect, createContext } from "react";
import checkAuth from "../services/checkAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await checkAuth();
      if (response.error) {
        setUser(null);
      } else {
        setUser(response);
      }
    }
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
