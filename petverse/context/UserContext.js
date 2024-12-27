"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

const UserContext = createContext();

export function Userprovider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      try {
        // Get user data
        const response = await fetch("/api/session", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session has expired", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();

    const interval = setInterval(fetchSession, 30000);

    return () => clearInterval(interval);
  }, []);

  // Redirect if session has expired
  useEffect(() => {
    if (!isLoading && user === null) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
