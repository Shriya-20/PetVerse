"use client";

import loginDoggy from "@/public/logindoggy.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Profile() {
  const [petsData, setPetsData] = useState([]);
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState({});
  const params = useParams();

  const userId = params.id;

  const router = useRouter();

  useEffect(() => {
    async function GetUserData() {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!response.ok)
          throw new Error("Error in fetching data from Backend");
        const data = await response.json();
        setUserData(() => ({
          ...data,
        }));
      } catch (error) {
        console.error("Error in fetching the data");
        console.log(error);
      }
    }

    async function GetUserPets() {
      try {
        const response = await fetch("/api/pets/userpets", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error("Failed to fetch pets");
        const pets = await response.json();
        console.log(pets);
        console.log(petsData);
        setPetsData(() => pets);
      } catch (error) {
        console.error("Error fetching the pet Data");
      }
    }

    if (user) {
      GetUserData();
      GetUserPets();
    }
  }, [user]);

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
                    src={
                      "profilePicture" in userData
                        ? userData.profilePicture
                        : loginDoggy
                    }
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
                  onClick={() => router.push("/petverse/messages")}
                >
                  Message
                </button>
              </div>

              {/* Profile Details */}
              <div className="text-center mt-6">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-textDark dark:text-textLight">
                  {userData.username}
                </h3>
                <div className="text-sm leading-normal text-textMid font-bold uppercase flex items-center justify-center">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-textMid dark:text-textDarker" />
                  {userData.location}
                </div>
              </div>

              {/* Pets Display */}
              <div className="mt-10 py-10 border-t border-blueGray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
                  {petsData?.length > 0 ? (
                    petsData.map((pet) => (
                      <Link
                        key={pet._id}
                        className="flex flex-col items-center p-2 hover:bg-slate-100 dark:hover:bg-mid4 rounded-2xl transition-all duration-200"
                        href={`/petverse/pets/${pet._id}`}
                      >
                        {/* Smaller Image */}
                        <div className="relative h-[80px] w-[80px]">
                          <Image
                            alt="pet-pic"
                            src={
                              "profilePicture" in pet
                                ? pet.profilePicture
                                : default_pet_profile_pic
                            }
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
                            {pet.type}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
