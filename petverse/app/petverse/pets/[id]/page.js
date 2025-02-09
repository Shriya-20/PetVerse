"use client";

import ProfileIcon from "@/app/components/ProfileIcon";
import default_pet_profile_pic from "@/public/default_pet_profile_pic1.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Modal from "@/app/components/Modal";
import LoginDoggy from "@/public/logindoggy.jpg";
import { uploadImageToServer } from "@/app/actions";
import { useRouter } from "next/navigation";
import defaultImage from "@/public/default_item.png";
import Slider2 from "@/app/components/Slider2";
import Loading from "@/app/components/Loading2";
import { PlayIcon } from "@heroicons/react/24/solid";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useUser } from "@/context/UserContext";
import { TrendingUp } from "@mui/icons-material";

export default function PetProfile() {
  const params = useParams();
  const changePetProfileRef = useRef();
  const petMedicalRef = useRef();
  const addPostImageRef = useRef();
  const [petData, setPetData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModel2Open] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [newName, setNewName] = useState("");
  const [newBreed, setNewBreed] = useState("");
  const [caption, setCaption] = useState("");
  const [petPosts, setPetPosts] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [openedPost, setOpenedPost] = useState(null);
  //const [mediaBuffer, setMediaBuffer] = useState(null);
  //const [mediaSrc, setMediaSrc] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [mediaSrc, setMediaSrc] = useState(null);
  const [mediaBuffer, setMediaBuffer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const petId = params.id;
  const userId = user.id;

  useEffect(() => {
    // Fetch pet data
    async function getPetData() {
      try {
        const response = await fetch("/api/pets", {
          method: "POST",
          body: JSON.stringify(params.id),
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

    // Fetch posts
    async function getPetPosts() {
      try {
        const response = await fetch("/api/pets/fetchposts", {
          method: "POST",
          body: JSON.stringify({ petId }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        console.log("Successfully fetched posts");
        const data = await response.json();
        console.log("PET DATAATATTAT");
        console.log(data);

        setPetPosts(() => data);
        console.log(petPosts);
      } catch (error) {
        console.log("Failed to fetch posts", error);
      }
    }
    getPetData();
    getPetPosts();
  }, []);

  const onClose = () => {
    setIsModalOpen(false);
  };

  // Edit profile
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

  // Delete profile
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

  // Change profile pic
  const handleChangeProfilepicButton = () => {
    changePetProfileRef.current.click();
  };

  async function handleChangeProfilepic(event) {
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      if (!file || !file.type.startsWith("image/")) {
        alert("Please select an valid image file");
        return;
      }
      const arrayBuffer = await file.arrayBuffer();

      const path = `${params.id}/profilePicture.jpg`;
      const imageUrl = await uploadImageToServer(arrayBuffer, path, "image");
      const response = await fetch("/api/update_pet_profile_pic", {
        method: "POST",
        body: JSON.stringify({ imageUrl, petId }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong. Try again");
      }
      console.log("profile pic updated");
      petData.profilePicture = imageUrl;
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error: ", error);
    }
  }

  // function to create post
  async function handleCreateNewPost(type) {
    try {
      setIsLoading(true);
      const identifier = new Date();
      const path = `${petId}/posts/file_${identifier}.jpg`;
      console.log(mediaBuffer);
      const imageUrl = await uploadImageToServer(mediaBuffer, path, type);
      console.log(imageUrl);

      const response = await fetch("/api/pets/post", {
        method: "POST",
        body: JSON.stringify({ imageUrl, petId, caption, type }),
      });
      setMediaSrc(null);
      setMediaBuffer(null);
      setCaption(null);
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      console.log("Successfully created post");
      setIsLoading(false);
      setIsPostModalOpen(false);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  // function to set post image
  const handlePostMedia = async (event) => {
    try {
      if (!event.target.files[0]) {
        return;
      }
      if (event.target.files[0].type.startsWith("image/")) {
        setMediaType("image");
      } else if (event.target.files[0].type.startsWith("video/")) {
        console.log("YTPE = " + event.target.files[0].type);
        setMediaType("video");
      } else {
        alert("Choose only a image or video");
        return;
      }
      const file = await event.target.files[0];
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });
      const dataUrl = URL.createObjectURL(blob);
      console.log("dataurl = " + dataUrl);
      setMediaSrc(dataUrl);
      setMediaBuffer(arrayBuffer);
      console.log(mediaBuffer);
      console.log(mediaSrc);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  return (
    <>
      {!isPostOpen && (
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
                  <p className="text-xl md:text-2xl lg:text-3xl">
                    {petData.name}
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl">
                    {petData.breed}
                  </p>
                  {petData.age && (
                    <p className="text-lg">{petData.age} years</p>
                  )}
                </div>
              </div>
              <Popover
                placement="left"
                className="absolute  dark:bg-dark2 bg-light2"
              >
                <PopoverHandler>
                  <button
                    className="absolute top-5 -right-1 hover:dark:bg-gray-700 hover:bg-slate-200 rounded-full  hover:text-customTeal transform scale-125"
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
                <PopoverContent className="dark:bg-dark1 bg-light2 h-[112] w-28 mt-3 p-0">
                  <button
                    className="w-full block p-2 hover:dark:bg-gray-700 hover:bg-gray-300 hover:text-customTeal rounded-lg"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Edit profile
                  </button>
                  <hr></hr>
                  <button
                    className="w-full block p-2 hover:dark:bg-gray-700 hover:bg-gray-300 rounded-lg hover:text-customTeal"
                    onClick={() => {
                      setMediaSrc(null);
                      setMediaBuffer(null);
                      setCaption(null);
                      setIsPostModalOpen(true);
                    }}
                  >
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
            {/* Posts display grid */}
            <div className="grid grid-cols-3 gap-1 justify-center justify-items-center">
              {petPosts.map((post, index) => (
                <div key={index} className="relative w-full h-0 pb-[100%]">
                  {post.type === "image" && (
                    <Image
                      src={post.imageUrl ? post.imageUrl : defaultImage}
                      alt="user post"
                      width={300}
                      height={300}
                      className="absolute top-0 left-0 w-full h-full object-cover  shadow-lg transition-all duration-300 hover:scale-95"
                      style={{
                        objectFit: "cover",
                      }}
                      unoptimized
                      onClick={() => {
                        setOpenedPost(index);
                        setIsPostOpen(true);
                      }}
                    />
                  )}
                  {post.type === "video" && (
                    <div
                      className="relative w-full h-0 pb-[100%] overflow-hidden bg-light1 transition-all duration-300 hover:scale-95"
                      onClick={() => {
                        setOpenedPost(index);
                        setIsPostOpen(true);
                      }}
                    >
                      <video
                        controls={false}
                        autoPlay={false}
                        preload="auto"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      >
                        <source src={post.imageUrl} type="video/mp4" />
                        Your browser does not support videos.
                      </video>
                      <div className="absolute top-1/2 left-1/2 w-8 h-8 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
                        <PlayIcon />
                      </div>
                    </div>
                  )}
                  {/* {post.type === "video" && (
                    <div
                      className="flex items-center bg-black dark:bg-dark2 justify-center w-full h-full absolute top-0 left-0 transition-all duration-300 hover:scale-95"
                      onClick={() => {
                        setOpenedPost(index);
                        setIsPostOpen(true);
                      }}
                    >
                      <video
                        controls={false}
                        className="max-w-full max-h-full object-contain"
                      >
                        <source src={post.imageUrl} type="video/mp4" />
                        Your browser does not support videos.
                      </video>
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
          {/* Edit profile section*/}
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
                    <Loading isLoading={isLoading} />
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
          {/* Create New Post */}
          <Modal
            onClose={() => {
              setMediaSrc(null);
              setMediaBuffer(null);
              setCaption(null);
              setIsPostModalOpen(false);
            }}
            isOpen={isPostModalOpen}
          >
            <div>
              <div className="text-center mb-2 font-semibold">
                Create a new post!
              </div>
              <div className="w-full flex justify-center">
                {!mediaType && (
                  <Image
                    src={defaultImage}
                    alt="post image"
                    className="object-cover rounded-sm"
                    layout="intrinsic"
                    width={200}
                    height={160}
                    onClick={() => addPostImageRef.current.click()}
                  />
                )}
                {mediaType === "image" && (
                  <Image
                    src={mediaSrc ? mediaSrc : defaultImage}
                    alt="post image"
                    className="object-cover rounded-sm"
                    layout="intrinsic"
                    width={200}
                    height={160}
                    onClick={() => addPostImageRef.current.click()}
                  />
                )}
                {/* Video */}
                {mediaType === "video" && mediaSrc && (
                  <video controls width={200} height={200}>
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support videos.
                  </video>
                )}

                <input
                  type="file"
                  accept="image/*, video/*"
                  className="hidden"
                  ref={addPostImageRef}
                  onChange={(e) => {
                    handlePostMedia(e);
                  }}
                />
              </div>

              <div className="mt-2">
                <textarea
                  placeholder="Enter caption"
                  className="w-full p-2 border border-gray-300 rounded-sm h-20 resize-none"
                  onChange={(e) => setCaption(e.target.value)}
                />
                {error && (
                  <div>
                    <p className="text-red-500 text-center">{error}</p>
                  </div>
                )}
                {!isLoading && (
                  <button
                    className="bg-customTeal text-white rounded-sm p-2 mt-2 hover:bg-teal-600 w-full"
                    onClick={() => {
                      if (mediaBuffer === null) {
                        alert("Add an image");
                      } else {
                        handleCreateNewPost(mediaType);
                      }
                    }}
                  >
                    Create Post
                  </button>
                )}
                {isLoading && (
                  <button className="bg-customTeal text-white rounded-sm p-2 mt-2 hover:bg-teal-600 w-full">
                    <Loading isLoading={isLoading} />
                  </button>
                )}
              </div>
            </div>
          </Modal>
        </>
      )}
      {/* Show posts */}
      {isPostOpen && (
        <div className="relative h-full">
          <div
            onClick={() => setIsPostOpen(false)}
            className="absolute top-4 right-4 px-4 py-2 text-xl hover:shadow-lg rounded-full  cursor-pointer z-10"
          >
            x
          </div>
          <div className="relative h-full flex justify-center items-center">
            <div className="relative h-auto w-full max-w-[1370px]">
              <Slider2
                petData={petData}
                slides={petPosts}
                currSlide={openedPost}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
