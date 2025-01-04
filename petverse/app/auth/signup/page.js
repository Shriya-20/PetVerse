"use client";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/_backend/firebaseConfig";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        throw new Error("password and confirm password do not match");
      }
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          email: email,
          password: password,
        }),
      });

      const errorData = await response.json();
      if (!response.ok) {
        throw new Error(errorData.error);
      }
      router.push("/auth/login");
    } catch (error) {
      if (error.message == "auth/email-already-in-use") {
        setError("Email address already in use");
      } else if (error.message == "auth/weak-password") {
        setError("Password should be atleast 6 characters");
      } else {
        setError(error.message);
      }
    }
  }

  async function handleSignUpWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result._tokenResponse.email;
      const name = result._tokenResponse.firstName;
      const dateJoined = new Date().toISOString();
      const newUser = {
        username: name,
        email: email,
        dateJoined: dateJoined,
      };
      const response = await fetch("/api/signup/google", {
        method: "POST",
        body: JSON.stringify({ newUser }),
      });
      const errorData = await response.json();
      if (!response.ok) {
        throw new Error(errorData.error);
      }

      router.push("/auth/login");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleSignUpWithFacebook() {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result._tokenResponse.email;
      const name = result._tokenResponse.firstName;
      const dateJoined = new Date().toISOString();
      const newUser = {
        username: name,
        email: email,
        dateJoined: dateJoined,
      };
      const response = await fetch("/api/signup/google", {
        method: "POST",
        body: JSON.stringify({ newUser }),
      });
      const errorData = await response.json();
      if (!response.ok) {
        throw new Error(errorData.error);
      }

      router.push("/auth/login");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className="mt-4 space-y-3 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
        {/* Sign Up with Google */}
        <button
          onClick={handleSignUpWithGoogle}
          className="flex items-center justify-center w-full px-4 py-2 space-x-3 text-sm text-center text-textDark transition-colors duration-300 transform border rounded-lg dark:text-textLight dark:border-light2 hover:bg-light2 dark:hover:bg-mid2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
            xmlSpace="preserve"
            className="w-5 h-5 fill-current"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          {""}

          <span className="text-sm text-textDarker dark:text-textLight">
            Sign Up with Google
          </span>
        </button>{" "}
        {/* SignUp with Facebook */}
        <button
          onClick={handleSignUpWithFacebook}
          className="flex items-center justify-center w-full px-4 py-2 space-x-3 text-sm text-center text-textDark transition-colors duration-300 transform border rounded-lg dark:text-textLight dark:border-light2 hover:bg-light2 dark:hover:bg-mid2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 48 48"
            xmlSpace="preserve"
            className="w-5 h-5 text-blue-500 fill-current"
          >
            <path d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
            <path
              fill="#fff"
              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
            ></path>
          </svg>
          {""}
          <span className="text-sm text-textDarker dark:text-textLight">
            SignUp with Facebook
          </span>
        </button>
      </div>{" "}
      {/* 'use email' text */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-mid2 lg:w-1/4" />{" "}
        <Link
          href="#"
          className="text-xs text-center text-textDark uppercase dark:text-textMid hover:underline"
        >
          or use your email
        </Link>{" "}
        <span className="w-1/5 border-b dark:border-mid1 lg:w-1/4" />
      </div>{" "}
      {/* Input form */}
      <form onSubmit={handleSignup}>
        <div className="mt-4">
          <label className="block mb-2 text-sm text-textDark dark:text-textLight">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={userName}
            required="required"
            autoComplete="name"
            autoFocus={true}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 text-textDark bg-light1 border border-light2 rounded-lg dark:bg-dark2 dark:text-textLight dark:border-mid2 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-mid1 focus:ring-opacity-20"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm text-textDark dark:text-textLight">
            E-Mail Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            required="required"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-textDark bg-light1 border border-light2 rounded-lg dark:bg-dark2 dark:text-textLight dark:border-mid2 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-mid1 focus:ring-opacity-20"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm text-textDark dark:text-textLight">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              required="required"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-textDark bg-light1 border border-light2 rounded-lg dark:bg-dark2 dark:text-textLight dark:border-mid2 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-mid1 focus:ring-opacity-20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5 text-textMid" />
              ) : (
                <EyeIcon className="w-5 h-5 text-textMid" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm text-textDark dark:text-textLight">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              value={confirmPassword}
              required="required"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 text-textDark bg-light1 border border-light2 rounded-lg dark:bg-dark2 dark:text-textLight dark:border-mid2 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-mid1 focus:ring-opacity-20"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-5 h-5 text-textMid" />
              ) : (
                <EyeIcon className="w-5 h-5 text-textMid" />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div>
            <p className="text-red-700 text-right">{error}</p>
          </div>
        )}

        {/* Register button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-customTeal/70 focus:outline-none focus:bg-customTeal-300"
          >
            Register
          </button>
        </div>
      </form>
      {/* Link to Login page */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-mid2 md:w-1/4"></span>{" "}
        <Link
          href="/auth/login"
          className="text-xs text-textDark uppercase dark:text-textMid hover:underline"
        >
          Do you have an account?
        </Link>{" "}
        <span className="w-1/5 border-b dark:border-mid2 md:w-1/4"></span>
      </div>
    </>
  );
}
