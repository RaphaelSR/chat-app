import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChange, signIn, signOut } from "../services/auth";

interface User {
  loggedIn: boolean;
  userId: string | null;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user: User) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSetUser = (user: User | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, setUser: handleSetUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
