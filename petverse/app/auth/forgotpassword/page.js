"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ForgotPassword() {
  const [isOtpActive, setisOtpActive] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGetOtp = () => {
    setisOtpActive(true);
    return;
  };

  const handleChangeOtp = () => {};

  const handlePasswordChange = () => {
    setPasswordChanged(true);
    setisOtpActive(false);
    return;
  };
  return (
    <>
      <div className="h-[430]">
        <p className="text-back text-2xl block w-full my-4">
          Forgot your password?
        </p>
        <label className="block mb-2 text-sm text-textDark dark:text-textLight">
          E-Mail Address or Phone number
        </label>{" "}
        <input
          type="email"
          name="email"
          defaultValue=""
          required="required"
          autoComplete="email"
          className="w-full px-4 py-2 text-textDark bg-light1 border border-light1 rounded-lg dark:bg-dark2 dark:text-textLight dark:border-mid2 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-mid1 focus:ring-opacity-20"
        />
        <button
          onClick={handleGetOtp}
          className="custom-button p-[5] rounded w-full my-2"
        >
          Get otp
        </button>
        <label className="block mb-2 text-sm text-textDark dark:text-textLight">
          Enter OTP
        </label>{" "}
        <input
          type="OTP"
          name="OTP"
          defaultValue=""
          required="required"
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
        />
        {isOtpActive && (
          <>
            <label className="block mt-2 text-sm text-textDark dark:text-textLight">
              Enter new passowrd
            </label>{" "}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                defaultValue=""
                required="required"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20 mb-2 mt-[5]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </>
        )}
        <button
          onClick={handlePasswordChange}
          className="custom-button p-[5] rounded w-full my-2"
        >
          Enter
        </button>
        {passwordChanged && (
          <p className="block text-green-600 m-1 text-md text-center">
            Password changed sucessfully!
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-mid2 md:w-1/4" />{" "}
          <Link
            href="/auth/login"
            className="text-xs text-textDark uppercase dark:text-textMid hover:underline"
            onClick={() => setPasswordChanged(false)}
          >
            go to login
          </Link>{" "}
          <span className="w-1/5 border-b dark:border-mid2 md:w-1/4" />
        </div>
      </div>
    </>
  );
}
