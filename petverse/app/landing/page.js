"use client";
import Link from "next/link";
import Image from "next/image";
import happyDoggy from "@/public/labrador-retriever-removebg-preview.png";
import confusedDoggy from "@/public/confuseddoggy-removebg-preview.png";
import backgroundDoggy from "@/public/bg-doggy.jpg";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const slider = document.getElementById("slider");
    const active = document.querySelector(".active");
    const line1 = document.querySelector(".line1");
    const line2 = document.querySelector(".line2");
    const line3 = document.querySelector(".line3");
    const line4 = document.querySelector(".line4");

    line1.onclick = function () {
      slider.style.transform = "translateX(0)";
      active.style.top = "0px";
    };
    line2.onclick = function () {
      slider.style.transform = "translateX(-25%)";
      active.style.top = "80px";
    };
    line3.onclick = function () {
      slider.style.transform = "translateX(-50%)";
      active.style.top = "160px";
    };
    line4.onclick = function () {
      slider.style.transform = "translateX(-75%)";
      active.style.top = "240px";
    };
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundDoggy.src})`,
        }}
        className="bg-cover bg-center h-svh relative"
      >
        <div className="sticky top-0 z-[100]">
          <div className="flex flex-row justify-between p-4 mx-2 text-white border-b-2 border-white">
            <div>
              <p>Petverse</p>
            </div>
            <div className="flex flex-row justify-between w-32">
              <Link href={"/petrverse"}>Contact</Link>
              <Link href={"/auth/signup"}>Sign up</Link>
            </div>
          </div>
        </div>
        <div className="w-[600px] h-[250px] absolute right-[14%] top-[57%] translate-y-[-50%] overflow-hidden">
          <div id="slider" className="inline-flex duration-[700ms]">
            <div className="landing-text">
              <h1> Connect with Fellow Pet Lovers</h1>
              <p>
                Join a thriving community of pet enthusiasts, share adorable
                moments, and discover like-minded friends for you and your furry
                companions.
              </p>
              <Link href={"/petverse"} className="landing-text-Link">
                Learn More
              </Link>
            </div>
            <div className="landing-text">
              <h1> Showcase Your Pets Personalities</h1>
              <p>
                Create unique profiles for your pets, highlight their quirks,
                and let them shine in the spotlight they deserve.
              </p>
              <Link href={"/petverse"} className="landing-text-Link">
                Learn More
              </Link>
            </div>
            <div className="landing-text">
              <h1> Adopt, Buy, or Sell with Ease</h1>
              <p>
                Find the perfect pet to welcome into your home or connect with
                responsible buyers and sellers in a trusted marketplace.
              </p>
              <Link href={"/petverse"} className="landing-text-Link">
                Learn More
              </Link>
            </div>
            <div className="landing-text">
              <h1> Discover Pet-Friendly Services</h1>
              <p>
                Explore nearby vets, grooming services, parks, and more with
                tailored recommendations for your pets needs.
              </p>
              <Link href={"/petverse"} className="landing-text-Link">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="w-[2px] h-[320px] block absolute bg-[#c0c0c0] top-[55%] right-[50px] translate-y-[-50%]">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
          <div className="line4"></div>
          <div className="active"></div>
        </div>
      </div>
    </>
  );
}
