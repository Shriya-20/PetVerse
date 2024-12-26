"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function DeleteAccount() {
  const [confirm, setConfirm] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleConfirmChange = (e) => {
    setConfirm(e.target.value);
  };

  async function handleDeleteUser() {
    try {
      const response = await fetch("/api/users/delete", {
        method: "POST",
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        return new Error("Failed to delete user");
      }

      console.log("user deleted successfully");
      router.push("/auth/login");
    } catch (error) {
      console.log("Failed to delete user");
    }
  }
  return (
    <>
      <form className="m-2">
        <p className="text-red-400 block mb-2">
          * Warning! Once deleted account cannot be restored
        </p>
        <input
          placeholder="type 'CONFIRM' to delete your account"
          className="w-1/3 p-2 border-1 border-dark1 rounded hover:bg-slate-100 mr-2 dark:bg-mid4"
          onChange={handleConfirmChange}
        />
        <button
          className="bg-red-600 text-textLighter p-2 rounded-md md:w-1/6 hover:bg-red-700"
          type="submit"
        >
          Delete
        </button>
      </form>
    </>
  );
}
