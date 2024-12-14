/* eslint-disable jsx-a11y/alt-text */
import loginDoggy from "@/public/logindoggy.jpg";
import Image from "next/image";
export default function AuthenticationLayout({ children }) {
  return (
    <div className="flex h-full bg-white overflow-clip">
      {/* Left Side - Travel Banner */}
      <div className="w-1/2 bg-cover bg-center relative">
        <Image src={loginDoggy} alt="login page image" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white  shadow-lg -mr-4">
        {children}
      </div>
    </div>
  );
}
