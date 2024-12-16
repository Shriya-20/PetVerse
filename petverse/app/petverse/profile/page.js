"use client";

import loginDoggy from "@/public/logindoggy.jpg";
import Image from "next/image";
import Link from "next/link";
import PetComponent from "@/app/components/PetComponent";

export default function Profile() {
  const pets = [
    {
      id: 19,
      owner: "sathvik",
      name: "kenchi",
      speice: "cat",
      breed: "persian",
      profilepic:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rover.com%2Fuk%2Fblog%2Forange-tabby-cat%2F&psig=AOvVaw1KrhvDCYleHRO_VUUsVGCo&ust=1734416890378000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCM28vUq4oDFQAAAAAdAAAAABAE",
    },
    {
      id: 15,
      owner: "sathvik",
      name: "kencha",
      speice: "dog",
      breed: "labrodor",
      profilepic:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rover.com%2Fuk%2Fblog%2Forange-tabby-cat%2F&psig=AOvVaw1KrhvDCYleHRO_VUUsVGCo&ust=1734416890378000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCM28vUq4oDFQAAAAAdAAAAABAE",
    },
    {
      id: 13,
      owner: "sathvik",
      name: "kenchi",
      speice: "cat",
      breed: "persian",
      profilepic:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rover.com%2Fuk%2Fblog%2Forange-tabby-cat%2F&psig=AOvVaw1KrhvDCYleHRO_VUUsVGCo&ust=1734416890378000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCM28vUq4oDFQAAAAAdAAAAABAE",
    },
    {
      id: 12,
      owner: "sathvik",
      name: "kencha",
      speice: "dog",
      breed: "labrodor",
      profilepic:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rover.com%2Fuk%2Fblog%2Forange-tabby-cat%2F&psig=AOvVaw1KrhvDCYleHRO_VUUsVGCo&ust=1734416890378000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCM28vUq4oDFQAAAAAdAAAAABAE",
    },
    {
      id: 29,
      owner: "sathvik",
      name: "kenchi",
      speice: "cat",
      breed: "persian",
      profilepic:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rover.com%2Fuk%2Fblog%2Forange-tabby-cat%2F&psig=AOvVaw1KrhvDCYleHRO_VUUsVGCo&ust=1734416890378000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCM28vUq4oDFQAAAAAdAAAAABAE",
    },
  ];
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
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x={0}
            y={0}
          >
            <polygon
              className="text-gray-200 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
      </section>

      {/* Profile Section */}
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                {/* Profile Image */}
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative h-[150px] w-[150px] -m-16 -ml-20 lg:-ml-16">
                    <Image
                      alt="profile-pic"
                      src={loginDoggy}
                      layout="fill"
                      objectFit="cover"
                      className="shadow-xl rounded-full border-4 border-white"
                    />
                  </div>
                </div>
                {/* Message Button */}
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-customTeal/80 hover:bg-customTeal/70 active:bg-customTeal/80 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Message
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
              </div>
              {/* Profile Details */}
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700">
                  Pluto
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400" />
                  Herga, Karnataka
                </div>
              </div>
              {/* User pets display */}
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="grid grid-cols-4 gap-6 justify-center">
                  {pets.map((pet) => (
                    <div key={pet.id} className="flex flex-col items-center">
                      <PetComponent image={loginDoggy} />
                      <div className="mt-4 text-gray-700">
                        <p className="font-bold">{pet.name}</p>
                        <p className="text-sm">{pet.speice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
