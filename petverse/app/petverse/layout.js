"use client";

import clsx from "clsx";
import Sidebar from "../components/Sidebar";
import { usePathname } from "next/navigation";

export default function Dashboard({ children }) {
  const pathname = usePathname();

  const isMessagesPage = pathname === "/petverse/messages";

  return (
    <>
      <div className="fixed inset-0 flex h-screen bg-white">
        <div className="lg:w-[245px] w-[55px] sticky top-0">
          <Sidebar />
        </div>
        <div
          className={clsx(
            "flex-grow overflow-auto max-h-screen p-0 mr-2 pt-2",
            {
              "flex-grow overflow-hidden max-h-screen p-0 mr-2 pt-2":
                isMessagesPage,
            }
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
