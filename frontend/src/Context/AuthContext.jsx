import { useContext, useState, useEffect, createContext } from "react";
import checkAuth from "../services/checkAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await checkAuth();
        
        if (response.error) {
          console.log("Authentication failed:", response.error);
          setUser(null);
        } else {
          console.log("User authenticated:", response);
          setUser(response);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("Current user state:", user);
  }, [user]); 

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}