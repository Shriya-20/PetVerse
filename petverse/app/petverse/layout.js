"use client";

import clsx from "clsx";
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";

export default function Dashboard({ children }) {
  const pathname = usePathname();

  const isMessagesPage = pathname === "/petverse/messages";

  return (
    <>
      <div className="fixed inset-0 flex h-screen bg-light1 dark:bg-dark1">
        <div className="md:w-[45px] lg:w-[240px] w-[55px] sticky top-0">
          <Sidebar />
        </div>
        <div
          className={clsx({
            "flex-grow overflow-auto max-h-screen p-0 m-0": !isMessagesPage,
            "flex-grow overflow-hidden max-h-screen p-0 m-0 ": isMessagesPage,
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
}
