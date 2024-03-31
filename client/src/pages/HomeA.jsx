import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HomeA() {
  return (
    <main className="m-5 p-20  max-w-full">
      {/* Top Section */}
      <div className="flex justify-between">
        <div>
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
          <div>
            <button>Request a demo</button>
            <button>Watch Video</button>
          </div>
        </div>
        <div>Home SLide Image</div>
      </div>
      {/* Explore Market Place */}
      {/* Unlock Feartures */}
      {/* Intergration  */}
      {/* Ready to serve */}
      {/* Client Reviews */}
      {/* News Letter */}
    </main>
  );
}
