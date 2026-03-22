import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("cinema_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication
    const mockUser = {
      name: "Mohamed Bashir",
      email: email,
      plan: "Premium",
    };
    setUser(mockUser);
    localStorage.setItem("cinema_user", JSON.stringify(mockUser));
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      name,
      email,
      plan: "Premium",
    };
    setUser(newUser);
    localStorage.setItem("cinema_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cinema_user");
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("cinema_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
