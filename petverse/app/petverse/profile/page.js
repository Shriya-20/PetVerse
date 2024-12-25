"use client";

import loginDoggy from "@/public/logindoggy.jpg";
import Image from "next/image";
import Modal from "@/app/components/Modal";
import addImage from "@/public/add.png";
import ProfileIcon from "@/app/components/ProfileIcon";
import { useState, useEffect, useRef } from "react";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import pets from "@/test_data/pets.js";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { getAdditionalUserInfo } from "firebase/auth";

export default function Profile() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [petsData, setPetsData] = useState([]);
  const { user, setUser } = useUser();
  const [userData, setUserData] = useState({});
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addPetData, setAddPetData] = useState({
    name: "",
    type: "",
    breed: "",
    location: "",
    userid: "",
  });
  const router = useRouter();
  const addPetProfileRef = useRef(null);

  // To check whether the user is authenticated or not

  useEffect(() => {
    async function GetUserData() {
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(user.id),
          credentials: "include",
        });
        if (!response.ok)
          throw new Error("Error in fetching data from Backend");
        const data = await response.json();
        setUserData(() => ({
          ...data,
        }));
        return userData;
      } catch (error) {
        console.error("Error in fetching the data");
        console.log(error);
      }
    }

    async function GetUserPets() {
      try {
        const response = await fetch("/api/pets/userpets", {
          method: "POST",
          body: JSON.stringify(user.id),
        });

        if (!response.ok) throw new Error("Failed to fetch pets");
        console.log(response);
        const pets = await response.json();
        console.log("AAAAAAAAAAAAAAAAA");
        console.log(pets);
        setPetsData(pets);
      } catch (error) {
        console.log("error in fetching data KKKKK");
        console.error("Error fetching the Data");
      }
    }

    if (user) {
      GetUserData();
      GetUserPets();
    }
  }, [user]);

  async function handleAddPet() {
    try {
      const response = await fetch("/api/pets/add", {
        method: "POST",
        body: JSON.stringify(addPetData),
      });
      console.log("added pet sucessfullt");
      console.log(response);
    } catch (error) {
      console.log("Failed to add pet", error);
    }
  }

  const handlePetDataChange = (e) => {
    const { name, value } = e.target;
    setAddPetData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddPetProfile = () => {
    addPetProfileRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file", file);
    }
  };

  if (!user) {
    console.log("Couldn't get user context");
  }

  console.log("USERPETS", petsData);

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
                  onClick={() => router.push("/petverse/settings")}
                >
                  Edit
                </button>
              </div>

              {/* Profile Details */}
              <div className="text-center mt-6">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-textDark dark:text-textLight">
                  {userData.username}
                </h3>
                <div className="text-sm leading-normal text-textMid font-bold uppercase flex items-center justify-center">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-textMid dark:text-textDarker" />
                  {user.location}
                </div>
              </div>

              {/* Pets Display */}
              <div className="mt-10 py-10 border-t border-blueGray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
                  {petsData?.length > 0 ? (
                    petsData.map((pet) => (
                      <div
                        key={pet._id}
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
                            {pet.type}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}

                  {/* Add Pet */}
                  <div className="flex flex-col items-center justify-center cursor-pointer rounded-2xl transition-all duration-200">
                    <div className="relative h-[80px] w-[80px] opacity-30 hover:opacity-50 transition-all">
                      <Image
                        alt="add-pet"
                        src={addImage}
                        layout="fill"
                        objectFit="cover"
                        onClick={openModal}
                        className="rounded-full border-2 border-light2 shadow-md"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="font-bold text-textDark dark:text-textLight text-sm">
                        Add pet
                      </p>
                    </div>
                    {/* Add pet Section */}
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                      <div className="md:grid md:grid-cols-3 md:justify-center">
                        <div className="md:flex md:flex-col items-center justify-center justify-items-center col-span-1 mb-4 relative">
                          <div className="relative">
                            <div className="relative inline-block">
                              <ProfileIcon
                                profile_pic={default_pet_profile_pic}
                                width="w-[170px]"
                                height="h-[170px]"
                              />
                              {/* Edit Button */}
                              <button
                                className="absolute bottom-2 right-2 p-2 bg-customTeal text-textLighter dark:text-textLight rounded-full hover:bg-teal-600"
                                onClick={handleAddPetProfile}
                              >
                                ✎
                              </button>
                              <input
                                type="file"
                                ref={addPetProfileRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                              />
                            </div>
                          </div>
                        </div>
                        <form
                          className="md:col-span-2 add-pet mr-6 "
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleAddPet();
                          }}
                        >
                          <input
                            name="name"
                            placeholder="Enter name"
                            onChange={(e) => handlePetDataChange(e)}
                            required
                          />
                          <input
                            name="type"
                            placeholder="Enter animal"
                            required
                            onChange={(e) => handlePetDataChange(e)}
                          />
                          <input
                            name="breed"
                            placeholder="Enter breed"
                            required
                            onChange={(e) => handlePetDataChange(e)}
                          />
                          <input
                            name="location"
                            placeholder="Enter location"
                            required
                            onChange={(e) => handlePetDataChange(e)}
                          />
                          <button
                            type="submit"
                            className="custom-button p-2 rounded m-2 w-full"
                          >
                            create profile
                          </button>
                        </form>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
