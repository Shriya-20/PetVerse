"use client";

import Link from "next/link";

export default function Login() {
  function handleLogin() {
    return 1;
  }
  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
        PETverse
      </h2>{" "}
      <p className="mt-2 text-xl text-center text-gray-600 dark:text-gray-200">
        We are <span className="text-primary">Happy</span> to see you back
      </p>{" "}
      <div className="mt-4 space-y-3 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
        {/* Login with Google */}
        <Link
          href="/petverse"
          className="flex items-center justify-center w-full px-4 py-2 space-x-3 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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

          <span className="text-sm text-gray-800 dark:text-gray-200">
            Login with Google
          </span>
        </Link>{" "}
        {/* Login with facebook */}
        <Link
          href="/petverse"
          className="flex items-center justify-center w-full px-4 py-2 space-x-3 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg dark:text-gray-300 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          <span className="text-sm text-gray-800 dark:text-gray-200">
            Login with Facebook
          </span>
        </Link>
      </div>{" "}
      {/* Use email  */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />{" "}
        <Link
          href="#"
          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or use your email
        </Link>{" "}
        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
      </div>{" "}
      {/* Login Form. Set up login! */}
      <form onSubmit={handleLogin}>
        <input
          type="hidden"
          name="_token"
          defaultValue="a695wZ9E7S37ZqKuRfiytuJuwR77nOL4L1jKVafn"
          autoComplete="off"
        />{" "}
        <div className="mt-4">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            E-Mail Address
          </label>{" "}
          <input
            type="email"
            name="email"
            defaultValue=""
            required="required"
            autoComplete="email"
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
          />
        </div>{" "}
        <div className="mt-4">
          <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
            Password
          </label>{" "}
          <input
            type="password"
            name="password"
            required="required"
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
          />
        </div>{" "}
        {/* Remember me */}
        <div className="flex justify-between mt-4">
          <div className="col-md-6 offset-md-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="border-gray-200 rounded shadow-sm text-primary dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
              />{" "}
              <label
                htmlFor="remember"
                className="ml-2 text-gray-700 dark:text-gray-300"
              >
                Remember Me
              </label>
            </div>
          </div>{" "}
          <Link
            href="/auth/forgotpassword"
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            Forgot Your Password?
          </Link>
        </div>{" "}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-customTeal/80 focus:outline-none focus:bg-customTeal/80"
          >
            Sign in
          </button>
        </div>
      </form>{" "}
      {/* Create account */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />{" "}
        <Link
          href="/auth/signup"
          className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          Create an account
        </Link>{" "}
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
      </div>
    </>
  );
}
