"use client";

import LoginDoggy from "@/public/logindoggy.jpg";
import { useState } from "react";
import ProfileIcon from "./ProfileIcon";

export default function EditProfile() {
  const [passwordChangeData, setPasswordChangeData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePasswordData = (event) => {
    const { name, value } = event.target;
    setPasswordChangeData({
      ...passwordChangeData,
      [name]: value,
    });
  };

  const handleChangePassword = () => {
    const isAnyEmpty = Object.values(passwordChangeData).some(
      (value) => value.trim() === ""
    );
    if (isAnyEmpty) {
      alert("All fields are required. Please fill out every field!");
      return;
    } else if (
      passwordChangeData.confirmPassword !== passwordChangeData.newPassword
    ) {
      alert("New password and confirm password must be the same");
      return;
    } else if (passwordChangeData.password !== data.password) {
      alert("Enter the current password correctly");
      return;
    } else {
      data.password = passwordChangeData.newPassword;
      alert("Password changed successfully!");
      return;
    }
  };

  const handleChangeLocation = () => {
    return;
  };

  const data = {
    username: "Sathvik",
    password: "sathvik",
    location: "Suratkhal, Mangalore",
    profile_pic: LoginDoggy,
  };

  return (
    <div className="md:grid md:grid-cols-3 gap-8 p-8">
      {/* Profile Picture Section */}
      <div className="md:flex md:flex-col items-center justify-center justify-items-center col-span-1 mb-4 relative">
        <div className="relative">
          {" "}
          <ProfileIcon
            profile_pic={LoginDoggy}
            width="w-[170px]"
            height="h-[170px]"
            className="border-2 border-white mb-4"
          ></ProfileIcon>
          {/* Edit Button */}
          <button className="absolute bottom-0 right-0 mb-2 mr-2 p-2 bg-customTeal text-white rounded-full hover:bg-teal-600">
            ✎
          </button>
        </div>
      </div>

      {/* User Details and Password Change Section */}
      <div className="col-span-2 space-y-2">
        {/* Change Username Section */}
        <div>
          <input
            type="text"
            placeholder="Enter new name"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button className="w-full p-2 text-white transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal">
            Change Name
          </button>
        </div>

        {/* Change Password Section */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter old password"
            onChange={handleChangePasswordData}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            onChange={handleChangePasswordData}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            onChange={handleChangePasswordData}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={handleChangePassword}
            className="w-full p-2 text-white transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
          >
            Change Password
          </button>
        </div>

        {/* Change Location Section */}
        <div>
          <input
            name="location"
            type="text"
            placeholder="Enter Location"
            onChange={handleChangeLocation}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={handleChangeLocation}
            className="w-full p-2 text-white transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
          >
            Change Location
          </button>
        </div>
      </div>
    </div>
  );
}
