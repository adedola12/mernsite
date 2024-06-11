import React from "react";
import { FaStar } from "react-icons/fa";

import { MdLocationOn } from "react-icons/md";

import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <div className="bg-white  shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full ">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrls[0]}
          alt="imageUrl"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3">
          <p className="text-lg font-semibold truncate text-slate-700">
            {product.name}
          </p>

          {/* <div className="flex gap-2 items-center w-full">
            <MdLocationOn className="h-4 w-4" />
            <p className="text-sm truncate w-full">{product.location}</p>
          </div> */}

          <p className="font-semibold flex items-center gap-2 text-base text-gray-500">
            NGN {product.regularPrice}/ {product.unit}
          </p>
          <div className="flex items-center flex-wrap gap-2 ">
            <FaStar onClick={() => {}} size={18} className="text-gray-300 cursor-pointer" />
            <FaStar onClick={() => {}} size={18} className="text-gray-300 cursor-pointer" />
            <FaStar onClick={() => {}} size={18} className="text-gray-300 cursor-pointer" />
            <FaStar onClick={() => {}} size={18} className="text-gray-300 cursor-pointer" />

              <span className="text-base text-gray-400">(91)</span>

              <span className="text-base text-gray-800">(91)</span>

          </div>
        </div>
        {/* Add RATING */}
      </Link>
    </div>
  );
}
