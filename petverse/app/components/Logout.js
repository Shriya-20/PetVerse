"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Logout() {
  const router = useRouter();
  const { setUser } = useUser();

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error logging out");
      }
      console.log("Logout Sucessful");
      router.push("/auth/login");
    } catch (error) {
      console.log(`Error while logging out. ${error}`);
    }
  }

  return (
    <>
      <div className="ml-2 p-1 m-1 dark:bg-dark2">
        <input
          placeholder="don't type 'CONFIRM' to delete your account"
          className="w-1/3 p-2 border-1 border-dark1 rounded hover:bg-slate-100 mr-2 dark:bg-mid4"
        />
        <button
          className="bg-red-600 text-textLighter p-2 rounded-md md:w-1/6 hover:bg-red-700"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </>
  );
}
