import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaStar,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ImageSlider from "../components/ImageSlider";
import SideBar from "../components/SideBar";
import ProductItem from "../components/productItem";
import { MdLocationOn } from "react-icons/md";
import StateSelector from "../components/StateSelector";
import TypeSelector from "../components/TypeSelector";

export default function HomeA() {
  const [categoryData, setCategoryData] = useState({
    categoryTerm: "",
    location: "",
    type: "",
  });
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(products);

  const handleCategorySelect = (category) => {
    const urlParams = new URLSearchParams(location.search);
    if (category) {
      urlParams.set("categories", category);
    } else {
      urlParams.delete("categories");
    }
    navigate(`?${urlParams.toString()}`, { replace: true });
  };

  const handleStateSelected = (newState) => {
    const urlParams = new URLSearchParams(location.search);
    if (newState) {
      urlParams.set("location", newState);
    } else {
      urlParams.delete("location");
    }

    // This will update the URL without navigating
    navigate(`?${urlParams.toString()}`, { replace: true });
  };

  const handleTypeSelected = (newType) => {
    const urlParams = new URLSearchParams(location.search);
    if (newType) {
      urlParams.set("type", newType);
    } else {
      urlParams.delete("type");
    }

    navigate(`?${urlParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const categoryTermUrl = urlParams.get("categories");
    const locationTermUrl = urlParams.get("location");
    const typeTermUrl = urlParams.get("type");

    if (categoryTermUrl || locationTermUrl || typeTermUrl) {
      setCategoryData({
        categoryTerm: categoryTermUrl || "",
        location: locationTermUrl || "",
        type: typeTermUrl || "",
      });
    }

    const fetchCategory = async () => {
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/product/getCat?${searchQuery}`);

        if (!res.ok) {
          throw new Error("Network respons was not ok");
        }

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("There is an error fetchin products:", error);
      }
    };

    fetchCategory();
  }, [location.search]);

  return (
    <main className="min-h-screen">
      {/* Top Section */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:justify-between py-16 px-4 sm:px-0 lg:px-0  gap-5">
          <div className="flex flex-col gap-5 md:mt-[149px] mt-10 pl-[102px]">
            <div className="flex rounded-lg bg-[#DBEFFF] text-black p-3 items-center gap-3 w-[280px]">
              <Link to={"/product"} className=" font-[Inter] text-[14px]">
                Construction management plugin
              </Link>
              <FaArrowRight className="items-center w-[16px] h-[16px]" />
            </div>
            <h1 className="text-3xl font-bold sm:text-5xl md:text-7xl font-[DMSans]">
              Quantity
              <span className="text-[#9747FF]"> takeoff</span> <br /> just got
              easier <br /> and faster
            </h1>
            <div className="flex flex-wrap items-center p-1 w-full">
              <p className="">
                ADLM studio provides a door to the world of amazing knowledge
                and skill required for the usage of BIM tools to be within the
                reach of Nigeria and Africa construction industry as a whole.
              </p>
            </div>
            <div className="flex gap-3 mt-3">
              <Link
                to={"https://wa.me/message/HS7PK467KV53I1"}
                className="bg-black border text-white p-4 rounded-lg  hover:bg-transparent hover:text-black"
              >
                Request a demo
              </Link>
              <Link
                to={"https://youtube.com/@ADLMStudio?si=Ul6dJx4YRVu-IR79"}
                className="border rounded-lg p-4 flex gap-3 items-center  hover:bg-black hover:text-white"
              >
                <FaPlay className="bg-transparent" /> Watch Video
              </Link>
            </div>
          </div>
          <div className="sm:block hidden h-full ml-[100px]">
            <ImageSlider />
          </div>
        </div>
      </div>
      {/* Explore Market Place */}
      <div className="bg-[#F5F5F5] flex gap-4 ">
        <div className="pl-[102px] w-full">
          <h2 className="font-semibold text-6xl pt-4 font-[DMSans]">
            Explore Marketplace
          </h2>
          <div className="flex md:flex-row flex-col gap-4 my-5">
            <div className="">
              <div className="w-[80px] h-[80px]">
                <img
                  src="..\logo\ADLM Studio Logo PNG-07.png"
                  alt=""
                  className="object-contain"
                />
              </div>
              <div>
                {/* CATEGORY LIST SIDE BAR ITEM */}
                <SideBar onCategorySelect={handleCategorySelect} />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-3xl pt-4">ADLM Marketplace</h2>
              <div className="m-4 flex gap-4 w-full">
                <div className="border bg-[#F1F1F1] rounded-lg p-5 flex gap-6 items-center w-[205px] justify-between">
                  <p className="text-[#CFCFCF] font-semibold">location</p>
                  <MdLocationOn className="text-[#CFCFCF] h-[16px] w-[16px]" />
                </div>
                {/* SELECT A STATE TO BE USED TO SEARCH FOR PRODUCT */}
                <StateSelector onStateSelected={handleStateSelected} />
                <TypeSelector onTypeSelected={handleTypeSelected} />
              </div>
              <div className="flex gap-4 flex-wrap p-8 w-full ">
                {products &&
                  products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Unlock Features */}
      <div className="flex md:flex-row flex-col items-start justify-between">
        <div className="h-[382px] mt-[152px] ml-[121px] flex flex-col  gap-5">
          <h2 className="font-bold text-5xl md-4">
            Unlock features of the
            <span className="text-[#E3B309]"> plugin</span>
          </h2>
          <ul className="space-y-2 text-[#828282]">
            <li className="flex gap-2 items-center">
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
          <Link className="mt-4 flex items-center justify-between rounded-lg border bg-[#E4E7EC] w-[150px] py-3 px-6">
            Learn more
            <FaArrowDown />
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="../sliderImages/ADLM Training Teazer.jpg"
            alt=""
            className="inset-0 w-full h-full object-cover object-right"
          />
        </div>
      </div>
      {/* Intergration  */}
      <div className="bg-[#F5F5F5] flex flex-col md:flex-row md:items-center md:justify-between px-8 py-16">
        <div className="flex flex-col space-y-5 md:space-y-7 w-[510px] ml-[189px] mt-[89px]">
          <h2 className="font-bold text-5xl text-[#1D1D1D]">
            Intergration with other Product
          </h2>
          <p className="text-[#1D1D1D] w-[405px]">
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
        <div className="flex justify-center items-center mt-10 md:mt-0 md:mr-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
            <div className="flex justify-center items-center w-40 h-24 bg-white shadow-md rounded hover:opacity-65">
              MsProject
            </div>
          </div>
        </div>
      </div>
      {/* Ready to serve */}
      <div className="my-[160px] mx-[190px] ">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-[56px] line-clamp-1">
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
              <div className="mt-[25px] ml-[34px] w-[64px] h-[64px] rounded-lg bg-white">
                <img src="" alt="Training Icon" />
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
              <div className="mt-[25px] ml-[34px] w-[64px] h-[64px] rounded-lg bg-white">
                <img src="" alt="Installation Icon" />
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
