/* eslint-disable jsx-a11y/alt-text */
import loginDoggy from "@/public/logindoggy.jpg";
import loginDoggy2 from "@/public/loginDoggies.jpg";
import Image from "next/image";
export default function AuthenticationLayout({ children }) {
  return (
    <div className="flex max-w-lg mx-auto my-16 overflow-hidden bg-white rounded-lg lg:space-x-8 dark:bg-gray-900 lg:max-w-5xl shadow-2xl">
      <div className=" items-center hidden lg:flex lg:w-1/2 relative">
        <Image src={loginDoggy} alt="Login image" height={700} width={700} />
      </div>{" "}
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">{children}</div>
    </div>
  );
}
