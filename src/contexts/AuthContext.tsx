import React, { createContext, useContext, useEffect, useState } from "react";
import { logout, onAuthStateChange, signIn } from "../services/auth";
import { LoggedInUser, User } from "../types";

interface AuthContextData {
  user: LoggedInUser | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  setUser: (user: LoggedInUser | null) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user: User) => {
      console.log("user", user);
      if (user) {
        setUser({
          ...user,
          loggedIn: true,
        });
      } else {
        setUser({
          loggedIn: false,
          userId: null,
        });
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSetUser = (user: LoggedInUser | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, logout, setUser: handleSetUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
