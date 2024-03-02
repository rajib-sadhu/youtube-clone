import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  //   const [currentUser, setCurrentUser] = useState(
  //     JSON.parse(localStorage.getItem("user"))
  //   );

  const registerUser = async (data) => {
    setLoading(true);
    return await axios.post("/api/v1/create-user", data);
  };

  //   useEffect(() => {
  //     localStorage.setItem("user", JSON.stringify(currentUser));
  //   }, [currentUser]);

  const authInfo = {
    registerUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
