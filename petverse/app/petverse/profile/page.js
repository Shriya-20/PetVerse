import loginDoggy from "@/public/logindoggy.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative block h-[500px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
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
                      src={loginDoggy} // Ensure this is properly imported
                      layout="fill"
                      objectFit="cover" // Ensures the image scales properly without distortion
                      className="shadow-xl rounded-full border-4 border-white"
                    />
                  </div>
                </div>
                {/* Connect Button */}
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
                {/* Stats */}
                {/* Remove the below div before adding the stats part */}
                <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                        22
                      </span>
                      <span className="text-sm text-gray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                        10
                      </span>
                      <span className="text-sm text-gray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                        89
                      </span>
                      <span className="text-sm text-gray-400">
                        Comments
                      </span>
                    </div>
                  </div>
                </div> */}
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
                {/* <div className="mb-2 text-gray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-gray-400" />
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-gray-600">
                  <i className="fas fa-university mr-2 text-lg text-gray-400" />
                  University of Computer Science
                </div> */}
              </div>
              {/* About Section */}
              {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-gray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure.
                    </p>
                    <Link href="#pablo" className="font-normal text-cu">
                      Show more
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
