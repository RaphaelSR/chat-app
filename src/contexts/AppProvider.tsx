import React from "react";
import { AuthProvider } from "../contexts/AuthContext";

const AppProvider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
