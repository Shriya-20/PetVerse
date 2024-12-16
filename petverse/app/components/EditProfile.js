"use client";

import LoginDoggy from "@/public/logindoggy.jpg";

import ProfileIcon from "./ProfileIcon";
export default function EditProfile() {
  const data = [
    {
      username: "Sathvik",
      password: "sathvik",
      location: "suratkhal, manglore",
      profile_pic: LoginDoggy,
    },
  ];
  return (
    <>
      <div>
        <div>
          <ProfileIcon props={data} />
        </div>
      </div>
    </>
  );
}
