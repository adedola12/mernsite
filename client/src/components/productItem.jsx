import React from "react";

import { Link } from "react-router-dom";
import StarRating from "./Rating";

export default function ProductItem({ product }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full ">
      <div className=" flex flex-col">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.imageUrls[0]}
            alt="imageUrl"
            className="h-[200px] md:h-[220px] w-full pointer-events-none object-cover hover:scale-105 transition-scale duration-300"
          />
          <div className="px-4 pt-4 flex flex-col gap-y-1">
            <p className="text-lg font-semibold truncate text-slate-700">
              {product.name}
            </p>
            <p className="font-semibold flex items-center gap-2 text-base text-gray-500">
              NGN {product.regularPrice}/ {product.unit}
            </p>
          </div>
        </Link>
        {/* Add RATING */}

        <div className="flex items-center flex-wrap gap-2 p-4">
          <StarRating />
          <span className="text-base text-gray-800">(91)</span>
        </div>
        
      </div>
    </div>
  );
}
