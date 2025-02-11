"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loading from "./Loading2";

export default function Logout() {
  const router = useRouter();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogout() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/logout", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error logging out");
      }
      setIsLoading(false);
      router.push("/auth/login");
    } catch (error) {
      setIsLoading(false);
      setError("Error while logging out");
    }
  }

  return (
    <>
      <div className="ml-2 p-1 m-1 dark:bg-dark2">
        <input
          placeholder="don't type 'CONFIRM' to delete your account"
          className="w-1/3 p-2 border-1 border-dark1 rounded hover:bg-slate-100 mr-2 dark:bg-mid4"
        />

        {!isLoading && (
          <button
            className="bg-red-600 text-textLighter p-2 rounded-md md:w-1/6 hover:bg-red-700"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
        {isLoading && (
          <button className="bg-red-600 text-textLighter p-2 py-5 rounded-md md:w-1/6 hover:bg-red-700 relative">
            <Loading isLoading={isLoading} />
          </button>
        )}
      </div>
      {error && (
        <div className="mx-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </>
  );
}
