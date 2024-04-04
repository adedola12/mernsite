import React, { useEffect, useState } from "react";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ImageSlider from "../components/ImageSlider";

export default function HomeA() {
  const [listing, setListing] = useState([]);

  SwiperCore.use([Navigation]);

  console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch("api/listing/get");
        const data = await res.json();

        setListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, []);

  return (
    <main className=" max-w-full">
      <div className="ml-[200px]">
        {/* Top Section */}
        <div className="flex justify-between">
          <div className="my-[100px] pt-10">
            <div className="flex rounded-lg bg-[#DBEFFF] text-black p-3 items-center gap-3 w-[350px]">
              <Link to={"/product"} className=" font-[Inter]">
                Construction management plugin
              </Link>
              <FaArrowRight className="items-center" />
            </div>
            <h1 className="text-3xl font-bold sm:text-8xl">
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
              <button className="bg-black border text-white p-4 rounded-lg  hover:bg-transparent hover:text-black">
                Request a demo
              </button>
              <button className="border rounded-lg p-4 flex gap-3 items-center  hover:bg-black hover:text-white">
                <FaPlay className="bg-transparent" /> Watch Video
              </button>
            </div>
          </div>
          <div>
            <ImageSlider />
          </div>
          {/* <div className="flex items-center justify-end">
          <Swiper navigation>
            {listing.map((list) => (
              <SwiperSlide key={list._id}>
                <div
                  style={{
                    background: `url(${list.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "contain md:cover",
                  }}
                  className="h-[700px] w-[500px]"
                  key={list._id}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
        </div>
      </div>
      {/* Explore Market Place */}
      <div className="bg-gray-300">
        <div className="ml-[200px]">
          <h2 className="font-semibold text-6xl pt-4">Expolre Marketplace</h2>
          <div className="flex gap-4 my-5">
            <div className="">
              <div className="w-[60px] h-[60px]">
                <img
                  src="..\logo\ADLM Studio Logo PNG-07.png"
                  alt=""
                  className="object-contain"
                />
              </div>
            </div>
            <div>Market Items Search Result</div>
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
