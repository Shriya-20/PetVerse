"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { auth } from "../_backend/firebaseConfig";
import Loading from "./Loading";

export default function DeleteAccount() {
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Delete user
  async function handleDeleteUser(e) {
    e.preventDefault();
    try {
      setError(null);
      setIsLoading(true);
      if (confirm != "CONFIRM") {
        throw new Error("Please Enter 'CONFIRM'");
      }

      // Send uid in request
      const uid = auth.currentUser.uid;

      const response = await fetch("/api/users/delete", {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          uid: uid,
        }),
        credentials: "include",
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error);
      }

      console.log("user deleted successfully");
      router.push("/auth/login");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }
  return (
    <>
      <form className="m-2 mx-4" onSubmit={handleDeleteUser}>
        <p className="text-red-400 block mb-2">
          * Warning! Once deleted your account cannot be restored
        </p>
        <input
          placeholder="type 'CONFIRM' to delete your account"
          className="w-1/3 p-2 border-1 border-dark1 rounded hover:bg-slate-100 mr-2 dark:bg-mid4 dark:text-textLight"
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
        />
        <button
          className="bg-red-600 text-textLighter p-2 rounded-md md:w-1/6 hover:bg-red-700"
          type="submit"
        >
          Delete
        </button>
      </form>
      {error && (
        <div className="mx-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      <Loading isLoading={isLoading} />
    </>
  );
}
