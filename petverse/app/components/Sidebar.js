import Link from "next/link";
import Image from "next/image";
import logo from "@/public/paw.png";
import {
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div
      className="h-screen sticky flex flex-col bg-slate-50 
                  w-[52] lg:w-[240]"
    >
      <div className="flex items-center p-4">
        <Image src={logo} alt="app logo" width={40} className="" />
        <p
          className="text-2xl font-semibold text-customTeal ml-2 transform scale-y-150 
                     hidden lg:block"
        >
          PET VERSE
        </p>
      </div>

      <ul className="flex flex-col flex-grow sidebar-list">
        <li className="sidebar-item">
          <Link href="/petverse/messages" className="sidebar-link">
            <ChatBubbleBottomCenterTextIcon className="sidebar-logo" />
            <span className="hidden lg:inline">Messages</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link href="/petverse/market" className="sidebar-link">
            <HomeIcon className="sidebar-logo" />
            <span className="hidden lg:inline">Marketplace</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link href="/petverse/profile" className="sidebar-link">
            <UserIcon className="sidebar-logo" />
            <span className="hidden lg:inline">Profile</span>
          </Link>
        </li>
        <li className="sidebar-item mt-auto">
          <Link href="/petverse/settings" className="sidebar-link">
            <Cog6ToothIcon className="sidebar-logo" />
            <span className="hidden lg:inline">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
