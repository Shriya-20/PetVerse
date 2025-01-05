import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Searchbar({ sendDatatoParent }) {
  const [searchedData, setSearchedData] = useState([]);
  const [isChatSearched, setIsChatSearched] = useState(false);

  const handleSendData = (data) => {
    sendDatatoParent(data.length > 0 ? data : searchedData);
  };

  const handleSearch = async (type, searchVal) => {
    if (!searchVal.trim() || searchVal === "") {
      setIsChatSearched(false);
      setSearchedData([]);
      return;
    }
    try {
      const response = await fetch("/api/search/items", {
        method: "POST",
        body: JSON.stringify({ type, searchVal }),
      });
      if (!response.ok) {
        throw new Error("Error in fetching searched data");
      }
      const data = await response.json();
      setIsChatSearched(true);
      setSearchedData(data);
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-2">
        <div className="bg-light1 dark:bg-dark2 w-full md:w-3/4 shadow p-2 flex items-center rounded-full transition-colors duration-300 ease-in-out;">
          <MagnifyingGlassIcon className="sidebar-logo mt-1" />

          <input
            className="bg-transparent focus:outline-none w-full h-full text-textDark dark:text-textLight text-[19px]"
            placeholder="Search"
            onChange={(e) => handleSearch("item", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendData([]);
                setIsChatSearched(false);
              }
            }}
          />
        </div>
      </div>
      {isChatSearched && (
        <div className="absolute z-50 bg-white dark:bg-dark2 w-full md:w-3/4 mt-2 md:ml-10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchedData.length > 0 ? (
            searchedData.map((data, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark1 cursor-pointer"
                onClick={() => {
                  setSearchedData([data]);

                  handleSendData([data]);
                  setIsChatSearched(false);
                }}
              >
                <p className="text-textDark dark:text-textLight">
                  {data.title}
                </p>
              </div>
            ))
          ) : (
            <div className="px-4 py-2">
              <p className="text-center text-textDark dark:text-textLight">
                No items found
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
