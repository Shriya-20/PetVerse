"use client";

import Link from "next/link";
import googleLogo from "@/public/google.png";
import Image from "next/image";

export default function Login() {
  function handleLogin() {
    return 1;
  }
  return (
    <>
      <div className="p-2 mx-16 my-4 w-2/3 h-3/4 justify-center border-neutral-400 rounded">
        <h2 className="text-5xl font-bold text-customTeal mb-3 mt-5 text-center">
          PETverse
        </h2>
        <form
          onSubmit={handleLogin}
          className="h-3/4 grid place-items-center mx-10 pb-8 pt-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="text text-gray-500 rounded-xl w-full border-neutral-400 border pl-5 py-1"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="text text-gray-500 rounded-xl w-full border-neutral-400 border pl-5 py-1"
            required
          />
          <button
            type="submit"
            className="text bg-customTeal hover:bg-teal-600 text-white rounded-xl w-full px-2 py-1"
          >
            Login
          </button>
          <div className="flex items-center w-full my-4">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="mx-4 text-gray-800 text-sm font-semibold">OR</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>

          <Link
            href="/auth/forgotpassword"
            className="text-gray-800 hover:text-customTeal"
          >
            Forgot password?
          </Link>
          <div className="flex flex-row justify-center mt-2 pr-2">
            <div className="w-9 h-9 mr-1">
              <Image
                src={googleLogo}
                alt="google logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="text text-black pt-[6px] hover:text-customTeal">
              Log in with Google
            </div>
          </div>
        </form>
        <div className="flex flex-row justify-center">
          <p className="text-black mr-1">Don&apos;t have an account?</p>
          <Link
            href="/auth/signup"
            className="text-customTeal hover:text-teal-600"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
