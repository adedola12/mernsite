import React from "react";
import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="p-7 md:min-h-screen  border-gray-500 border-b-2 md:border-r-2 ">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <label className="whitespace-nowrap font-semibold">
              Search Term:{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold">Type: </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>offer</span>
            </div>
          </div>
          <div className="flex gap-4">
            <label className="whitespace-nowrap font-semibold">
              Amenities:{" "}
            </label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label className="whitespace-nowrap font-semibold">Sort :</label>
            <select id="sort_order" className="p-2 border rounded-lg">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="uppercase text-white bg-slate-700 p-3 font-semibold rounded-lg max-w-[320px] items-center hover:opacity-90">
            Search
          </button>
        </form>
      </div>
      <div className="flex">
        <h1 className="text-3xl border-b p-3 mt-5 font-semibold text-slate-800">
          Listing result:
        </h1>
      </div>
    </div>
  );
}
