import Link from "next/link";
import Image from "next/image";
import logo from "@/public/paw.png";
import {
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const links = [
  {
    placeholder: "Messages",
    icon: ChatBubbleBottomCenterTextIcon,
    dest: "/petverse/messages",
  },
  {
    placeholder: "Explore",
    icon: MagnifyingGlassIcon,
    dest: "/petverse/explore",
  },
  {
    placeholder: "Marketplace",
    icon: HomeIcon,
    dest: "/petverse/market",
  },
  {
    placeholder: "Profle",
    icon: UserIcon,
    dest: "/petverse/profile",
  },
  {
    placeholder: "Settings",
    icon: Cog6ToothIcon,
    dest: "/petverse/settings",
  },
];

export default function Sidebar() {
  return (
    <div
      className="h-full sticky flex flex-col bg-light1 dark:bg-dark2 
                  w-[52] lg:w-[240] shadow-xl dark:shadow-md dark:shadow-mid3"
    >
      <div className="flex items-center p-4">
        <Image src={logo} alt="app logo" width={40} className="rounded-full" />
        <p
          className="text-2xl font-semibold text-customTeal ml-2 transform scale-y-150 
                     hidden lg:block"
        >
          PET VERSE
        </p>
      </div>

      <ul className="flex flex-col flex-grow sidebar-list">
        {links.map(({ placeholder, icon: IconComponent, dest }) => (
          <li key={dest} className="sidebar-item">
            <Link href={dest} className="sidebar-link">
              <IconComponent className="sidebar-logo" />
              <span className="hidden lg:inline  dark:text-textLight">
                {placeholder}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
