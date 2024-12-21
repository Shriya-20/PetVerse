import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="flex justify-center items-center mt-2">
        <div className="bg-light1 dark:bg-dark2 w-full md:w-3/4 shadow p-2 flex items-center rounded-full transition-colors duration-300 ease-in-out;">
          <MagnifyingGlassIcon className="sidebar-logo mt-1" />

          <input
            className="bg-transparent focus:outline-none w-full h-full text-textDark dark:text-textLight text-[19px]"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}