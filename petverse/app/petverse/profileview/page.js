"use client";

import loginDoggy from "@/public/logindoggy.jpg";
import Image from "next/image";
import Modal from "@/app/components/Modal";
import addImage from "@/public/add.png";
import ProfileIcon from "@/app/components/ProfileIcon";
import { useState, useEffect } from "react";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import pets from "@/test_data/pets.js";

export default function ProfileView() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [pets, setPets] = useState([]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleAddPet = () => {
    return;
  };

  useEffect(() => {
    async function GetUserData() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok)
          throw new Error("Error in fetching data from Backend");
        const userData = await response.json();
        console.log(userData);
        setUser(userData[0]);

        return userData;
      } catch (error) {
        console.error("Error in fetching the data");
        console.log(error);
      }
    }

    GetUserData();
  }, []);

  /*
  useEffect(() => {
    async function GetUserPets() {
      try {
        const response = await fetch("/api/pets", {
          method: "POST",
          body: JSON.stringify(user._id)
        });

        if (!response.ok) throw new Error("Failed to fetch pets");
        const pets = await response.json()
        setPets(pets)
      } catch (error) {
        console.error("Error fetching the Data")
      }
    }
    GetUserPets();
  }, []);
  */

  return (
    <>
      {/* Hero Section */}
      <section className="relative block h-[300px]">
        <div className="absolute top-0 w-full h-full bg-center bg-customTeal">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50"
          />
        </div>
      </section>

      {/* Profile Section */}
      <section className="relative py-16 bg-light1 dark:bg-dark1 ">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-light1 dark:bg-dark2 shadow-xl dark:shadow-sm dark:shadow-mid3 w-full mb-6 rounded-lg z-10 -mt-64">
            <div className="px-6">
              {/* Profile Header */}
              <div className="flex justify-center">
                {/* Profile Image */}
                <div className="relative h-[150px] w-[150px] -mt-20">
                  <Image
                    alt="profile-pic"
                    src={loginDoggy}
                    layout="fill"
                    objectFit="cover"
                    className="shadow-xl rounded-full border-4 border-light1  dark:border-dark1 mx-auto"
                  />
                </div>
              </div>

              {/* Edit Button */}
              <div className="text-center mt-6">
                <button
                  className="bg-customTeal/80 hover:bg-customTeal/70 text-textLighter dark:text-textLight font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md text-xs transition-all duration-150 ease-linear"
                  type="button"
                >
                  Message
                </button>
              </div>

              {/* Profile Details */}
              <div className="text-center mt-6">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-textDark dark:text-textLight">
                  {user.username}
                </h3>
                <div className="text-sm leading-normal text-textMid font-bold uppercase flex items-center justify-center">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-textMid dark:text-textDarker" />
                  {user.location}
                </div>
              </div>

              {/* Pets Display */}
              <div className="mt-10 py-10 border-t border-blueGray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
                  {user.pets?.length > 0 ? (
                    user.pets.map((pet) => (
                      <div
                        key={pets.id}
                        className="flex flex-col items-center p-2 hover:bg-slate-100 dark:hover:bg-mid4 rounded-2xl transition-all duration-200"
                      >
                        {/* Smaller Image */}
                        <div className="relative h-[80px] w-[80px]">
                          <Image
                            alt="pet-pic"
                            src={loginDoggy}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full border-2 border-light2  shadow-md"
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="font-bold text-textDark dark:text-textLight text-sm">
                            {pet.name}
                          </p>
                          <p className="text-xs text-textDark dark:text-textLight">
                            {pet.speice}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}

                  {/* Add Pet */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}