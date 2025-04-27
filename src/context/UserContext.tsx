import { createContext, useState, useEffect } from "react";

interface UserProviderInterface {
  children: React.ReactNode;
}

interface UserContextInterface {
  user: string | null;
  saveUser: (username: string) => void;
  isUserLoggedIn: () => boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextInterface | null>(null);

export const UserProvider = ({ children }: UserProviderInterface) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const saveUser = (username: string) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null)
  }

  const isUserLoggedIn = () => {
    return user !== null;
  };

  return (
    <UserContext.Provider value={{ user, saveUser, isUserLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};