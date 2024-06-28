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

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ImageSlider from "../components/ImageSlider";
import Marketplace from "../components/MarketPlace";
// Import Marketplace component

export default function HomeA() {



  return (
    <main className="min-h-screen">
      {/* Top Section */}
      <div className="w-full text-center md:text-start">
        <div className="flex flex-col lg:flex-row lg:justify-between py-16 px-4 sm:px-0 lg:pl-10  gap-5">
          <div className="flex flex-col items-center lg:items-start gap-5 lg:mt-[50px] mt-5 p-5 ">
            <div className="flex rounded-lg bg-[#DBEFFF] text-black p-3  justify-center gap-3 lg:w-[280px]">
              <Link to={"/product"} className=" font-[Inter] text-[14px]">
                Construction management plugin
              </Link>
              <FaArrowRight className="items-center w-[16px] h-[16px]" />
            </div>
            <h1 className="text-4xl text-center lg:text-start font-bold md:text-6xl font-[DMSans] w-full">
              Quantity
              <span className="text-[#9747FF]"> takeoff</span> <br /> just got
              easier <br /> and faster
            </h1>
            <div className="flex flex-wrap items-center p-1 w-full md:max-w-2xl md:mx-auto">
              <p className="">
                ADLM studio provides a door to the world of amazing knowledge
                and skill required for the usage of BIM tools to be within the
                reach of Nigeria and Africa construction industry as a whole.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <Link
                to={"https://wa.me/message/HS7PK467KV53I1"}
                className="bg-black duration-300 border-2 text-white p-4 rounded-lg  hover:bg-transparent border-black hover:text-black"
              >
                Request a demo
              </Link>
              <Link
                to={"https://youtube.com/@ADLMStudio?si=Ul6dJx4YRVu-IR79"}
                className="rounded-lg p-4 flex gap-3 items-center border-2  border-black duration-300  hover:bg-black  hover:text-white"
              >
                <FaPlay className="bg-transparent" /> Watch Video
              </Link>
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


      {/* Unlock Features */}
      <div className="flex lg:flex-row flex-col items-start justify-between px-10">
        <div className="p-5 mb-5  flex flex-col gap-5">
          <h2 className="font-bold text-4xl my-4 md:text-6xl">
            Unlock features of the
            <span className="text-[#E3B309]"> plugin</span>
          </h2>
          <ul className="space-y-2 text-[#828282] text-lg md:text-2xl">
            <li className="flex gap-2 items-center ">
              <FaStar />
              <p>Rates</p>
            </li>
            <li className="flex gap-2 items-center">
              <FaStar />
              <p>Export to excel</p>
            </li>
            <li className="flex gap-2 items-center">
              <FaStar />
              <p>Reports</p>
            </li>
            <li className="flex gap-2 items-center">
              <FaStar />
              <p>Material schedule for measured works</p>
            </li>
          </ul>
          <Link className="my-4 flex items-center justify-between rounded-lg border bg-[#6a98e9] w-[170px] py-3 px-4">
            <span className="font-bold text-lg">Learn more</span>
            <FaArrowDown />
          </Link>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="../sliderImages/ADLM Training Teazer.jpg"
            alt=""
            className="inset-0 w-full h-full object-cover object-right"
          />
        </div>
      </div>
      {/* Integration */}

    <div className="bg-[#F5F5F5] ">
        <div className="lg:max-w-screen-lg lg:mx-auto gap-y-10 flex flex-col lg:flex-row md:items-center lg:justify-between px-8 py-16">
          <div className="flex flex-col space-y-5 md:space-y-7 lg:w-[510px] lg:mt-[89px]">
            <h2 className="font-bold text-5xl md:text-6xl text-[#1D1D1D]">
              Integration with other Product
            </h2>
            <p className="text-[#1D1D1D] w-[405px] md:text-2xl">
              Learn how teams of all sizes are using ADLM integrate with other
              products to create value.
            </p>
            <div className="flex space-x-5 ">
              <div className="w-[246px] border-t-2 border-black">
                <h3 className="text-3xl font-bold text-[#1D1D1D] pt-3">10,000</h3>
                <p className="text-[#828282]">
                  Vendors from all over the country
                </p>
              </div>
              <div className="w-[246px] border-t-2 border-black">
                <h3 className="text-3xl font-bold text-[#1D1D1D] pt-3">50,000</h3>
                <p className="text-[#828282]">Users Uses ADLM Plugins</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10 md:mt-0 ">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-5">
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/msProject.png"
                  alt="msProject"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/autodesk.png"
                  alt="autodesk"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/autoCad.png"
                  alt="autoCad"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/bluebeam.png"
                  alt="bluebeam"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/costX.png"
                  alt="costX"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/excel.png"
                  alt="excel"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/navisworks.png"
                  alt="navisworks"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/planswift.png"
                  alt="planswift"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/powerBi.png"
                  alt="powerBI"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
              <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
                <img
                  src="logo/revit.png"
                  alt="revit"
                  className="object-cover w-[64px] h-[64px]"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
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
          <Link className="bg-[#F5F5F5] p-6 rounded-lg shadow-md w-full md:w-1/2">
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
          <Link className="bg-[#F5F5F5] p-6 rounded-lg shadow-md w-full md:w-1/2">
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
      <div className="bg-[#212121] text-white py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What our client say</h2>
          <p className="mb-8">
            Learn how teams of all sizes are using ADLM to integrate with other
            products to create value.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Each Block of item */}
          {/* TODO:|| Map our the reviews to the backend section of the code */}

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <blockquote className="mb-4">
              <p className="mb-4">
                "Innovative digital learning that focuses on training people on
                how to use BIM tools to carry out 4D, 5D, 6D designs projects."
              </p>
            </blockquote>
            <div className="flex items-center mt-6">
              <img
                src=""
                alt="Client"
                className="w-16 h-16 rounded-full mr-4 bg-blue-500"
              />
              <div className="">
                <h4 className="text-lg font-bold">Salama</h4>
                <p className="text-gray-400">CEO, Eden</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <blockquote className="mb-4">
              <p className="mb-4">
                "Innovative digital learning that focuses on training people on
                how to use BIM tools to carry out 4D, 5D, 6D designs projects."
              </p>
            </blockquote>
            <div className="flex items-center mt-6">
              <img
                src=""
                alt="Client"
                className="w-16 h-16 rounded-full mr-4 bg-blue-500"
              />
              <div className="">
                <h4 className="text-lg font-bold">Salama</h4>
                <p className="text-gray-400">CEO, Eden</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
            <blockquote className="mb-4">
              <p className="mb-4">
                "Innovative digital learning that focuses on training people on
                how to use BIM tools to carry out 4D, 5D, 6D designs projects."
              </p>
            </blockquote>
            <div className="flex items-center mt-6">
              <img
                src=""
                alt="Client"
                className="w-16 h-16 rounded-full mr-4 bg-blue-500"
              />
              <div className="">
                <h4 className="text-lg font-bold">Salama</h4>
                <p className="text-gray-400">CEO, Eden</p>
              </div>
            </div>
          </div>
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
      {/* News Letter */}
    </main>
  );
}
