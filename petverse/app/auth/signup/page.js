"use client";
import Link from "next/link";
import Image from "next/image";
import googleLogo from "@/public/google.png";

export default function Signup() {
  function handleSignUp() {
    return 1;
  }

  return (
    <>
      <div className="p-2 mx-16 my-6 w-2/3 h-2/3 justify-center border-neutral-400 border rounded">
        <h2 className="text-5xl font-bold text-customTeal mb-3 mt-5 text-center">
          PETverse
        </h2>
        <form
          onSubmit={handleSignUp}
          className="h-3/4 grid place-items-center mx-10 pb-8 pt-4"
        >
          <input
            type="username"
            placeholder="Username"
            className="text text-gray-500 rounded-xl w-full border-neutral-400 border pl-5 py-1"
            required
          />
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
            Sign up
          </button>
          <div className="flex items-center w-full my-4">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="mx-4 text-gray-800 text-sm font-semibold">OR</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>

          <div className="flex flex-row justify-center mt-2 pr-2">
            <div className="w-9 h-9 mr-1">
              <Image
                src={googleLogo}
                alt="google logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="text text-black pt-[6px] hover:text-customTeal">
              sign up with Google
            </div>
          </div>
        </form>
        <div className="flex flex-row justify-center">
          <p className="text-black mr-1">Already have an account?</p>
          <Link
            href="/auth/login"
            className="text-customTeal hover:text-teal-600"
          >
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
