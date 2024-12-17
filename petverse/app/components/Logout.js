"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => router.push("/auth/login");

  return (
    <>
      <div className="ml-2 p-1 m-1">
        <input
          placeholder="don't type 'CONFIRM' to delete your account"
          className="w-1/3 p-2 border-1 border-black rounded hover:bg-slate-100 mr-2"
        />
        <button
          className="bg-red-600 text-white p-2 rounded-md md:w-1/6 hover:bg-red-700"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </>
  );
}
