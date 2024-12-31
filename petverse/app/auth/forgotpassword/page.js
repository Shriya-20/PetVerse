"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [emailSent, setemailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, SetError] = useState(null);

  async function handlePasswordChange() {
    try {
      const response = await fetch("/api/password/reset", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
      console.log("RE : " + response);
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error(responseData.error);
      }
      SetError(null);
      setemailSent(true);
    } catch (error) {
      setemailSent(false);
      if (error.message == "auth/invalid-email") {
        SetError("Please enter a valid email address");
      } else {
        SetError(error.message);
      }
    }
  }
  return (
    <>
      <div className="h-[500]">
        <p className="text-back text-2xl block w-full my-4">
          Forgot your password?
        </p>
        <label className="block mb-2 text-sm text-textDark dark:text-textLight">
          Enter your E-Mail Address
        </label>{" "}
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required="required"
          autoComplete="email"
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
        />
        {emailSent && (
          <p className="block text-green-600 m-1 text-md text-center">
            password reset link sent to your email
          </p>
        )}
        {error && <p className="text-red-600 text-right">{error}</p>}
        <button
          onClick={handlePasswordChange}
          className="custom-button p-[5] rounded w-full my-2"
        >
          Get Mail
        </button>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-mid2 md:w-1/4"></span>{" "}
          <Link
            href="/auth/login"
            className="text-xs text-textDark uppercase dark:text-textMid hover:underline"
          >
            Go to login
          </Link>{" "}
          <span className="w-1/5 border-b dark:border-mid2 md:w-1/4"></span>
        </div>
      </div>
    </>
  );
}
