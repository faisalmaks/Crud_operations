"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://crud-operations-8tkg.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        alert(data.message || "Login failed");
        return false;
      }

      // Save user data
      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Save JWT token
      localStorage.setItem(
        "token",
        data.token
      );

      return true;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  const signup = async (payload) => {
    try {
      const response = await fetch(
        "https://crud-operations-8tkg.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Signup Error:", error);
      return {
        message: "Signup failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);