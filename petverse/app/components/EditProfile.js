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
    return
  }

  const data = {
    username: "Sathvik",
    password: "sathvik",
    location: "Suratkhal, Mangalore",
    profile_pic: LoginDoggy,
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center col-span-1">
        <ProfileIcon
          profile_pic={LoginDoggy}
          width="w-[120px]"
          height="h-[120px]"
          className="border-2 border-white mb-4"
        />
      </div>

      {/* User Details and Password Change Section */}
      <div className="col-span-2 space-y-4">
        {/* Change Username Section */}
        <input
            placeholder="Enter new name"
            className="flex-grow p-2 border border-gray-300 rounded-md w-2/3"
          />
          <button className="custom-button w-1/3  px-4 py-2 rounded-md">
            Change Name
          </button>
          <input
            name="password"
            placeholder="Enter old password"
            onChange={handleChangePasswordData}
            className="flex-grow p-2 border border-gray-300 rounded-md block w-2/3"
          />
          <input
            name="newPassword"
            placeholder="Enter new password"
            onChange={handleChangePasswordData}
            className="flex-grow p-2 border border-gray-300 rounded-md w-2/3 block"
          />
            <input
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleChangePasswordData}
              className="flex-grow p-2 border border-gray-300 rounded-md w-2/3"
            />
            <button
              onClick={handleChangePassword}
              className="custom-button w-1/3  px-6 py-2 rounded-md shrink-0"
            >
              Change Password
            </button>
            <input
              name="location"
              placeholder="Enter Location"
              onChange={handleChangeLocation}
              className="flex-grow p-2 border border-gray-300 rounded-md w-2/3"
            />
            <button
              onClick={handleChangeLocation}
              className="custom-button px-6 py-2 rounded-md w-1/3"
            >
              Change Location
            </button>


        {/* Change User location Section */ }

      </div>
    </div>
  );
}
