// HomeA.js
import React from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "swiper/css/bundle";
import ImageSlider from "../../components/ImageSlider";
import Marketplace from "../../components/MarketPlace";

export default function HomeA() {
  return (
    <main className="min-h-screen">
      {/* Top Section */}
      <div className="w-full text-center md:text-start">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:py-16 px-4 sm:px-0 lg:pl-10  gap-5">
          <div className="flex flex-col items-center lg:items-start gap-5 lg:mt-[50px] mt-5 p-5 ">
            <h1 className="text-5xl text-center lg:text-start font-bold md:text-6xl font-[DMSans] w-full">
              Construction
              <span className="text-[#9747FF]"> Materials</span> <br />{" "}
              procurement just got
              <br /> easier
            </h1>
            <div className="flex flex-wrap items-center p-1 w-full md:max-w-2xl md:mx-auto">
              <p className="">
                Pioneering platform that simplifies the procurement process for
                the building construction market. It offers a comprehensive
                range of building materials, making it easier than ever for
                professionals and businesses to access the resources they need.
                Our marketplace is designed to support the Nigerian and African
                construction industries by providing a seamless and efficient
                way to procure high-quality materials of all types.
              </p>
            </div>
          </div>
          <div className="lg:block hidden lg:self-center overflow-hidden">
            <ImageSlider />
          </div>
        </div>
      </div>
      {/* Explore Market Place */}
      <div className="w-full flex flex-col">
        {/* Use Marketplace component */}
        <Marketplace />
      </div>

      {/* Integration */}

      {/* Ready to serve */}
      <div className=" my-10 lg:my-[160px] p-5 lg:mx-[190px] ">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-5xl md:text-[56px] line-clamp-1">
            We are here to serve you
          </h2>
          <p className="text-[#828282] font-normal text-[16px]">
            Here are some of the serviecs you tend to benefit when you use tthe
            ADLM Plugin
          </p>
        </div>
        <div className="flex md:flex-row flex-col mt-6  gap-8 justify-center">
          <Link
            className="bg-[#F5F5F5] p-6 rounded-lg shadow-md w-full md:w-1/2"
            // to={"/services"}
          >
            <div className="flex flex-col">
              <div className="w-[64px] h-[64px] rounded-lg bg-white flex items-center justify-center">
                <img src="icon/bldg.png" alt="Training Icon" />
              </div>
              <div className="md:mt-[200px] mt-[50px] flex flex-col gap-4">
                <h2 className="text-[#212121] font-bold text-[32px]">
                  Training
                </h2>
                <p className="text-[#828282]">
                  Innovative digital learning that focus on training people on
                  how to use BIM tools to carry out 4D, 5D, 6D designs projects
                </p>
              </div>
            </div>
          </Link>
          <Link
            className="bg-[#F5F5F5] p-6 rounded-lg shadow-md w-full md:w-1/2"
            // to={"/pricing"}
          >
            <div className="flex flex-col">
              <div className=" w-[64px] h-[64px] rounded-lg bg-white flex items-center justify-center">
                <img
                  src="icon/bldg2.png"
                  alt="Installation Icon"
                  className="items-center object-cover"
                />
              </div>
              <div className="md:mt-[200px] mt-[50px] flex flex-col gap-4">
                <h2 className="text-[#212121] font-bold text-[32px]">
                  Installation
                </h2>
                <p className="text-[#828282]">
                  Learn to install plugin and software for use on each
                  construction project
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="items-center justify-center my-[30px] flex gap-8">
          <div className="flex items-center justify-center w-10 h-10 text-gray-600 border-2 border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none ">
            <FaArrowLeft />
          </div>
          <div className="flex items-center justify-center w-10 h-10 text-gray-600 border-2 border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none ">
            <FaArrowRight />
          </div>
        </div>
      </div>

      {/* Client Reviews */}

      {/* News Letter */}
    </main>
  );
}
