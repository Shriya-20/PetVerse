"use client";

import loginDoggy from "@/public/logindoggy.jpg";
import Image from "next/image";
import Modal from "@/app/components/Modal";
import addImage from "@/public/add.png";
import ProfileIcon from "@/app/components/ProfileIcon";
import { useState } from "react";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import pets from "@/test_data/pets.js";

export default function Profile() {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const handleAddPet = () => {
    return;
  };

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
      <section className="relative py-16 bg-light1">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-light1 shadow-xl w-full mb-6 rounded-lg z-10 -mt-64">
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
                    className="shadow-xl rounded-full border-4 border-light1 mx-auto"
                  />
                </div>
              </div>

              {/* Edit Button */}
              <div className="text-center mt-6">
                <button
                  className="bg-customTeal/80 hover:bg-customTeal/70 text-textLighter font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md text-xs transition-all duration-150 ease-linear"
                  type="button"
                >
                  Edit
                </button>
              </div>

              {/* Profile Details */}
              <div className="text-center mt-6">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-textDark">
                  Pluto
                </h3>
                <div className="text-sm leading-normal text-textMid font-bold uppercase flex items-center justify-center">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-textMid" />
                  Herga, Karnataka
                </div>
              </div>

              {/* Pets Display */}
              <div className="mt-10 py-10 border-t border-blueGray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="flex flex-col items-center p-2 hover:bg-slate-100 rounded-2xl transition-all duration-200"
                    >
                      {/* Smaller Image */}
                      <div className="relative h-[80px] w-[80px]">
                        <Image
                          alt="pet-pic"
                          src={loginDoggy}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full border-2 border-light2 shadow-md"
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <p className="font-bold text-textDark text-sm">
                          {pet.name}
                        </p>
                        <p className="text-xs text-textDark">{pet.speice}</p>
                      </div>
                    </div>
                  ))}

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
                      <p className="font-bold text-textDark text-sm">Add pet</p>
                    </div>
                    {/* Add pet Section */}
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                      <div className="md:grid md:grid-cols-3 md:justify-center">
                        <div className="md:flex md:flex-col items-center justify-center justify-items-center col-span-1 mb-4 relative">
                          <div className="relative">
                            {" "}
                            <ProfileIcon
                              profile_pic={default_pet_profile_pic}
                              width="w-[170px]"
                              height="h-[170px]"
                              className="border-2 border-light1 mb-4"
                            ></ProfileIcon>
                            {/* Edit Button */}
                            <button className="absolute bottom-0 right-0 mb-2 mr-2 p-2 bg-customTeal text-textLighter rounded-full hover:bg-teal-600">
                              ✎
                            </button>
                          </div>
                        </div>
                        <form className="md:col-span-2 add-pet mr-6">
                          <input name="name" placeholder="Enter name" />
                          <input name="type" placeholder="Enter animal" />
                          <input name="breed" placeholder="Enter breed" />
                          <input name="location" placeholder="Enter location" />
                          <button
                            type="submit"
                            onClick={handleAddPet}
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
