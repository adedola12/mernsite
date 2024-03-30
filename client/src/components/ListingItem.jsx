import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3">
          <p className="text-lg font-semibold truncate text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-3 w-full">
            <MdLocationOn className="h-4 w-4 text-blue-700" />
            <p className="text-sm text-grey-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            {listing.regularPrice}
            {/* {listing.offer ? listing.discountPrice : listing.regularPrice} */}
            {listing.rent === "rent" && "/ month"}
          </p>
          <div className="flex gap-4 text-slate-700">
            <p className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </p>
            <p className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
