import React, { useEffect, useState } from "react";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ImageSlider from "../components/ImageSlider";
import SideBar from "../components/SideBar";
import ProductItem from "../components/productItem";

export default function HomeA() {
  const [products, setProducts] = useState([]);

  return (
    <main className=" max-w-full">
      <div className="ml-[200px]">
        {/* Top Section */}
        <div className="flex justify-between flex-col md:flex-row">
          <div className="my-[100px] pt-10">
            <div className="flex rounded-lg bg-[#DBEFFF] text-black p-3 items-center gap-3 w-[350px]">
              <Link to={"/product"} className=" font-[Inter]">
                Construction management plugin
              </Link>
              <FaArrowRight className="items-center" />
            </div>
            <h1 className="text-3xl font-bold sm:text-8xl md:text-8xl">
              Quantity
              <span className="text-[#9747FF]"> takeoff</span> <br /> just got
              easier <br /> and faster
            </h1>
            <div className="flex items-center p-1 border rounded-full bg-purple-100 w-[150px]">
              <img
                src="https://www.bing.com/th?id=OIP.PztowP3ljup0SM75tkDimQHaHa&w=110&h=109&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="image"
                className="h-[30px] w-[30px] rounded-[50%] object-cover border"
              />
              <img
                src="https://www.bing.com/th?id=OIP.PztowP3ljup0SM75tkDimQHaHa&w=110&h=109&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="image"
                className="h-[30px] w-[30px] rounded-[50%] object-cover border"
              />
              <img
                src="https://www.bing.com/th?id=OIP.PztowP3ljup0SM75tkDimQHaHa&w=110&h=109&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="image"
                className="h-[30px] w-[30px] rounded-[50%] object-cover border"
              />
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
          <div>
            <ImageSlider />
          </div>
        </div>
      </div>
      {/* Explore Market Place */}
      <div className="bg-[#F5F5F5]">
        <div className="ml-[200px]">
          <h2 className="font-semibold text-6xl pt-4">Expolre Marketplace</h2>
          <div className="flex gap-4 my-5">
            <div className="">
              <div className="w-[80px] h-[80px]">
                <img
                  src="..\logo\ADLM Studio Logo PNG-07.png"
                  alt=""
                  className="object-contain"
                />
              </div>
              <div>
                <SideBar />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-3xl pt-4">ADLM Marketplace</h2>
              <div className="m-4 flex gap-4 justify-between w-full">
                <input
                  type="text"
                  className="border bg-[#F1F1F1] rounded-lg p-5 "
                  placeholder="location"
                  name="location"
                />
                <input
                  type="text"
                  className="border rounded-lg p-5 "
                  placeholder="city"
                  name="city"
                />
                <input
                  type="text"
                  className="border rounded-lg p-5 "
                  placeholder="Product Type"
                  name="productType"
                />
              </div>
              <div className="">
                {products &&
                  products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Unlock Feartures */}
      {/* Intergration  */}
      {/* Ready to serve */}
      {/* Client Reviews */}
      {/* News Letter */}
    </main>
  );
}
