import Link from "next/link";
import Image from "next/image";
import logo from "@/public/paw.png";

export default function Sidebar() {
  return (
    <>
      <div className="w-64 h-screen sticky bg-slate-50 flex flex-col">
        {" "}
        <div className="flex items-center p-4">
          <Image src={logo} alt="app logo" width={40} />
          <p className="text-2xl font-semibold text-customTeal ml-2 transform scale-y-150">
            PET VERSE
          </p>
        </div>
        <ul className="flex flex-col flex-grow sidebar-list">
          {" "}
          <li>
            <Link className="sidebar-link" href="/petverse/messages">
              Messages
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" href="/petverse/market">
              Marketplace
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" href="/petverse/profile">
              Profile
            </Link>
          </li>
          <li className="mt-auto">
            <Link className="sidebar-link" href="/petverse/settings">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
