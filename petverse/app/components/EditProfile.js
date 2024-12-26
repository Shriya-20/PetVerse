"use client";

import LoginDoggy from "@/public/logindoggy.jpg";
import { useState, useRef } from "react";
import { useUser } from "@/context/UserContext";
import ProfileIcon from "./ProfileIcon";
import { uploadImageToServer } from "../actions";

export default function EditProfile() {
  const changeUserProfileRef = useRef();
  const [newUsername, setNewUserName] = useState("");
  const [newLocation, steNewLocation] = useState("");
  const [passwordChangeData, setPasswordChangeData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user } = useUser();

  const handleChangeProfilepicButton = () => {
    changeUserProfileRef.current.click();
  };

  async function handleChangeProfilepic(event) {
    const file = event.target.files[0];
    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error); // Handle errors
      reader.readAsArrayBuffer(file);
    });

    const path = `${user.id}/profilePic.jpg`;
    const imageUrl = await uploadImageToServer(arrayBuffer, path);

    if (file) {
      console.log("file selected");
    }
  }

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

  const handleNameInput = (e) => {
    setNewUserName(e.target.value);
  };

  // not completed yet
  const handleChangeName = async () => {
    try {
      const reponse = await fetch("/api/users/update/username", {
        method: "POST",
        body: JSON.stringify(),
      });
    } catch (error) {
      console.log(error);
      console.log("Failed to change username");
    }
  };

  return (
    <div className="md:grid md:grid-cols-3 gap-8 p-8">
      {/* Profile Picture Section */}
      <div className="md:flex md:flex-col items-center justify-center justify-items-center col-span-1 mb-4 relative">
        <div className="relative">
          {" "}
          <div className="relative inline-block">
            <ProfileIcon
              profile_pic={LoginDoggy}
              width="w-[170px]"
              height="h-[170px]"
              className="border-2 border-light1 mb-4"
            ></ProfileIcon>
            {/* Edit Button */}
            <button
              className="absolute bottom-0 right-0 mb-2 mr-2 p-2 bg-customTeal text-textLighter rounded-full hover:bg-teal-600"
              onClick={handleChangeProfilepicButton}
            >
              ✎
            </button>
            <input
              type="file"
              ref={changeUserProfileRef}
              onChange={handleChangeProfilepic}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* User Details and Password Change Section */}
      <div className="col-span-2 space-y-2">
        {/* Change Username Section */}
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeName();
          }}
        >
          <input
            type="text"
            placeholder="Enter new name"
            className="edit-profile-input"
            required
          />
          <button
            className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
            type="submit"
          >
            Change Name
          </button>
        </form>

        {/* Change Password Section */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Enter old password"
            onChange={handleChangePasswordData}
            className="edit-profile-input"
          />
          <input
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            onChange={handleChangePasswordData}
            className="edit-profile-input"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            onChange={handleChangePasswordData}
            className="edit-profile-input"
          />
          <button
            onClick={handleChangePassword}
            className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
          >
            Change Password
          </button>
        </div>

        {/* Change Location Section */}
        <form>
          <input
            name="location"
            type="text"
            placeholder="Enter Location"
            onChange={handleChangeLocation}
            className="edit-profile-input"
            required
          />
          <button
            onClick={handleChangeLocation}
            className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
          >
            Change Location
          </button>
        </form>
      </div>
    </div>
  );
}
