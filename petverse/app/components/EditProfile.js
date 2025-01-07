"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import ProfileIcon from "./ProfileIcon";
import { uploadImageToServer } from "../actions";
import Popup from "./Popup";
import default_profile_pic from "@/public/default_user_profile_pic.jpeg";

export default function EditProfile() {
  const changeUserProfileRef = useRef();
  const [newUsername, setNewUserName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [userData, setUserData] = useState({});
  const [popUp, setPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [popUpType, setPopUpType] = useState("success");
  const [imageBuffer, setImageBuffer] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [passwordChangeData, setPasswordChangeData] = useState({
    password: "",

    newPassword: "",
    confirmPassword: "",
  });

  const handlePopUp = (type, message) => {
    setPopUpType(type);
    setPopUpMessage(message);
    setPopUp(true);
  };

  const handlePopUpClose = () => {
    setPopUp(false);
  };

  const { user } = useUser();
  const userId = user.id;

  const handleChangeProfilepicButton = () => {
    changeUserProfileRef.current.click();
  };

  useEffect(() => {
    async function handleUserProfile() {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const userdata = await response.json();
        setUserData(() => ({
          ...userdata,
        }));

        console.log("fetched user");
      } catch (error) {
        console.log("Failed to get user profile", error);
      }
    }

    handleUserProfile();
  }, [user]);

  const handleProfilePic = async (event) => {
    try {
      if (!event.target.files[0]) {
        return;
      }
      const file = event.target.files[0];
      const arrayBuffer = await file.arrayBuffer();

      const blob = new Blob([arrayBuffer], { type: file.type });
      const dataUrl = URL.createObjectURL(blob);
      setImageSrc(dataUrl);

      setImageBuffer(arrayBuffer);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  async function handleChangeProfilepic() {
    try {
      if (!imageBuffer) {
        return;
      }
      const path = `users/${userId}/profilePic.jpg`;
      const imageUrl = await uploadImageToServer(imageBuffer, path, "image");
      const response = await fetch("/api/update_profile_pic", {
        method: "POST",
        body: JSON.stringify({ imageUrl, userId }),
      });
      if (!response.ok) {
        throw new Error("");
      }
      handlePopUp("success", "Profile pic changed");
    } catch (error) {
      handlePopUp("error", "Failed to changed Profile pic. Try again");
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

  const handleLocationInput = (e) => {
    setNewLocation(e.target.value);
  };

  const handleChangeLocation = async () => {
    try {
      const response = await fetch("/api/users/update/location", {
        method: "POST",
        body: JSON.stringify({ userId: user.id, location: newLocation }),
      });

      if (!response.ok) {
        return new Error("Failed to change location of user");
      }
      console.log(response);
      console.log("Successfully updated user location");
      handlePopUp("success", "Changed your location");
    } catch (error) {
      handlePopUp("error", "Failed change to your location");
      console.log("Failed to update user data");
    } finally {
      setNewLocation("");
    }
  };

  const handleNameInput = (e) => {
    setNewUserName(e.target.value);
  };

  const handleChangeName = async () => {
    try {
      const response = await fetch("/api/users/update/username", {
        method: "POST",
        body: JSON.stringify({ userId: user.id, name: newUsername }),
      });

      if (!response.ok) {
        return new Error("Failed to change username");
      }
      handlePopUp("success", "Changed your username");
    } catch (error) {
      handlePopUp("error", "Failed change to your username");
      console.log(error);
    } finally {
      setNewUserName("");
    }
  };

  return (
    <>
      {popUp && (
        <Popup
          type={popUpType}
          message={popUpMessage}
          onClose={handlePopUpClose}
        />
      )}
      <div className="md:grid md:grid-cols-3 gap-8 p-8">
        {/* Profile Picture Section */}
        <div className="md:flex md:flex-col items-center justify-center justify-items-center col-span-1 mb-4 relative">
          <div className="relative">
            {" "}
            <div className="relative inline-block">
              <ProfileIcon
                profile_pic={
                  imageSrc
                    ? imageSrc
                    : userData.profilePicture
                    ? userData.profilePicture
                    : default_profile_pic
                }
                width="w-[150px]"
                height="h-[150px]"
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
                onChange={handleProfilePic}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <button
                className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
                onClick={handleChangeProfilepic}
              >
                Update profile pic
              </button>
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
              value={newUsername}
              onChange={handleNameInput}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangeLocation();
            }}
          >
            <input
              name="location"
              type="text"
              placeholder="Enter Location"
              value={newLocation}
              onChange={handleLocationInput}
              className="edit-profile-input"
              required
            />
            <button
              className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
              type="submit"
            >
              Change Location
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
