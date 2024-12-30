"use client";

import ProfileIcon from "@/app/components/ProfileIcon";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import posts from "@/test_data/posts";
import Modal from "@/app/components/Modal";
import LoginDoggy from "@/public/logindoggy.jpg";
import { uploadImageToServer } from "@/app/actions";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useUser } from "@/context/UserContext";
import { userAgent } from "next/server";

export default function PetProfile() {
  const params = useParams();
  const changePetProfileRef = useRef();
  const petMedicalRef = useRef();
  const [petData, setPetData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModel2Open] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [newName, setNewName] = useState("");
  const [newBreed, setNewBreed] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const userId = user.id;

  useEffect(() => {
    async function getPetData() {
      try {
        const response = await fetch("/api/pets", {
          method: "POST",
          body: JSON.stringify(params),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Error fetching pet Data");
        }
        const data = await response.json();
        console.log(data);
        setPetData(() => ({
          ...data,
        }));
      } catch (error) {
        console.log(error);
      }
    }
    getPetData();
  }, []);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleChangeInfo = async (field, value) => {
    try {
      const response = await fetch("/api/pets/update", {
        method: "POST",
        body: JSON.stringify({ field: field, value: value, petId: params.id }),
      });

      if (!response.ok) {
        return new Error("Failed to change location of user");
      }
      console.log(response);
      console.log("Successfully updated user details");
    } catch (error) {
      console.log("Failed to update pet details");
    }
  };

  async function handleDeleteProfile() {
    try {
      if (confirm !== "CONFIRM") {
        throw new Error("type CONFIRM to delete");
      }
      const response = await fetch("/api/pets/delete", {
        method: "POST",
        body: JSON.stringify({ petId: params.id, userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }
      console.log("Successfully deleted profile");

      router.push("/petverse/profile");
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeProfilepicButton = () => {
    changePetProfileRef.current.click();
  };

  async function handleChangeProfilepic(event) {
    try {
      const file = event.target.files[0];
      const arrayBuffer = await file.arrayBuffer();

      const path = `${params.id}/profilePicture.jpg`;
      const imageUrl = await uploadImageToServer(arrayBuffer, path);
      const response = await fetch("/api/update_pet_profile_pic", {
        method: "POST",
        body: JSON.stringify({ imageUrl, userId }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong. Try again");
      }
      console.log("profile pic updated");
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <>
      <div className="flex flex-col my-0 mx-2 md:mx-8 lg:mx-16 relative">
        <div className="flex flex-wrap px-4 md:px-8 lg:px-12 my-8">
          <div className=" shrink-0">
            <ProfileIcon
              profile_pic={
                "profilePicture" in petData
                  ? petData.profilePicture
                  : default_pet_profile_pic
              }
              height="h-20 md:h-32 lg:h-36"
              width="w-20 md:w-32 lg:w-36"
            />
          </div>
          <div className="shrink px-3 md:px-5 lg:px-7">
            <div className="flex flex-col">
              <p className="text-xl md:text-2xl lg:text-3xl">{petData.name}</p>
              <p className="text-sm md:text-lg lg:text-xl">{petData.breed}</p>
              {petData.age && <p className="text-lg">{petData.age} years</p>}
            </div>
          </div>
          <Popover placement="left" className="absolute bg-dark2">
            <PopoverHandler>
              <button
                className="absolute top-5 -right-1 hover:bg-gray-700 rounded-full  hover:text-customTeal transform scale-125"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6h.01M12 12h.01M12 18h.01"
                  />
                </svg>
              </button>
            </PopoverHandler>
            <PopoverContent className="bg-dark1 h-[112] w-28 mt-3 p-0">
              <button
                className="w-full block p-2 hover:bg-gray-700 hover:text-customTeal rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Edit profile
              </button>
              <hr></hr>
              <button className="w-full block p-2 hover:bg-gray-700 rounded-lg hover:text-customTeal">
                New post
              </button>
              <hr></hr>
              <button
                className="w-full block p-2 rounded-lg hover:bg-red-500"
                onClick={() => setIsModel2Open(true)}
              >
                Delete Profile
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <hr></hr>
        <br></br>
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post, index) => (
            <div key={index} className="relative w-full h-0 pb-[100%]">
              <Image
                src={post.image}
                alt="user post"
                width={300} //
                height={300} //
                className="absolute top-0 left-0 w-full h-full object-cover  shadow-lg transition-all duration-300 hover:scale-95"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal onClose={onClose} isOpen={isModalOpen}>
        <div className="md:grid md:grid-cols-3 gap-8 p-8">
          {/* Profile Picture Section */}
          <div className="md:flex md:flex-col items-center justify-center justify-items-center col-span-1 mb-4 relative">
            <div className="relative">
              {" "}
              <div className="relative inline-block">
                <ProfileIcon
                  profile_pic={
                    "profilePicture" in petData
                      ? petData.profilePicture
                      : LoginDoggy
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
                  ref={changePetProfileRef}
                  onChange={handleChangeProfilepic}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Pets Edit Seciton */}
          <div className="col-span-2 space-y-2">
            {/* Change name Section */}
            <form
              className=""
              onSubmit={(e) => {
                e.preventDefault();
                handleChangeInfo("name", newName);
              }}
            >
              <input
                type="text"
                placeholder="Name"
                className="edit-profile-input"
                required
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
                type="submit"
              >
                Change Name
              </button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangeInfo("breed", newBreed);
              }}
            >
              <input
                name="breed"
                type="text"
                placeholder="Breed"
                onChange={(e) => setNewBreed(e.target.value)}
                className="edit-profile-input"
              />
              <button
                type="submit"
                className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
              >
                Change Breed
              </button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangeInfo("location", newLocation);
              }}
            >
              <input
                name="location"
                type="text"
                placeholder="Location"
                onChange={(e) => setNewLocation(e.target.value)}
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
            <form>
              <div className="flex items-center space-x-2 -mt-1">
                <button
                  onClick={() => petMedicalRef.current.click()}
                  className="p-2 -mt-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none dark:bg-mid4 dark:border-light2 dark:border-[0.5px] darK:hover:bg-gray-500"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-600 dark:text-light2 dark:bg-mid4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15.25V5.75a3.75 3.75 0 017.5 0v9.5a6.75 6.75 0 01-13.5 0V8.5"
                    />
                  </svg>
                </button>

                <input
                  name="medical documents"
                  type="file"
                  ref={petMedicalRef}
                  className="hidden"
                  required
                />

                <div className="flex-1 mt-2">
                  <input
                    type="text"
                    placeholder="Medical document"
                    className="w-full edit-profile-input p-2 border rounded-md"
                    readOnly
                  />
                </div>
              </div>

              <button
                className="w-full p-2 text-textLighter transition-colors duration-300 transform rounded-md bg-customTeal hover:bg-teal-600 focus:outline-none active:bg-customTeal"
                type="submit"
              >
                Add Document
              </button>
            </form>
          </div>
        </div>
      </Modal>
      {/* Delete Pet profile */}
      <Modal
        onClose={() => {
          setIsModel2Open(false);
        }}
        isOpen={isModal2Open}
      >
        <form
          className="m-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteProfile();
          }}
        >
          <p className="text-red-400 block mb-2">
            * Warning! Once deleted account cannot be restored. Type
            &#39;CONFIRM&#39;
          </p>
          <input
            placeholder="CONFIRM"
            className="w-1/3 p-2 border-1 border-dark1 rounded hover:bg-slate-100 mr-2 dark:bg-mid4"
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            className="bg-red-600 text-textLighter p-2 rounded-md md:w-1/6 hover:bg-red-700"
            type="submit"
          >
            Delete
          </button>
        </form>
      </Modal>
    </>
  );
}
