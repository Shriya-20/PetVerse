"use client";

import Loading from "@/app/loading";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export function Userprovider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/session", {
          credentials: "include",
        });
        console.log(response);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.log("Error fetching session:", error);
      }
    }
    fetchSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
